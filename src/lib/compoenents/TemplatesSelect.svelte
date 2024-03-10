<script lang="ts">
  import type { Template } from "$lib/types";
  import { v4 as uuidv4 } from "uuid";
  import { toasts } from "svelte-toasts";
  import format from "string-format";
  import { saveChat } from "$lib/api/saveChat";
  import { goto } from "$app/navigation";
  import { ChatsListValid } from "$lib/stores/invalidations";
  import TemplateCreationBox from "$lib/compoenents/TemplateCreationBox.svelte";
  import { getUserChats } from "$lib/api/getUserChats";
  import { IsLoggedIn } from "$lib/stores/auth";
  import { defaultTemplates } from "$lib/data/defaultTemplates";
  import { getUserTemplates } from "$lib/api/getUserTemplates";

  let templates: Template[] = [ ...defaultTemplates ];
  let loadingTemplates = false;

  const loadTemplates = async () => {
    loadingTemplates = true;

    const r = await getUserTemplates({});
    if (r.success) {
      templates = [...r.data.map((c) => ({
        id: c.templateId,
        name: c.data.name, 
        description: "",
        systemPrompt: c.data.systemPrompt,
        messagesPrompt: c.data.messages,
        variables: []
      })).reverse(), ...defaultTemplates];
    } else {
      toasts.error("Error loading new chats list");
    }

    loadingTemplates = false;
  };

  $: loadTemplates();

  //
  const templatesVariables = {};

  $: templates.forEach((template) => {
    templatesVariables[template.id] ??= {};
    template.variables.forEach((variable) => {
      templatesVariables[template.id][variable.target] ??= "";
    });
  });

  const startChatFromTemplate = async (template: Template) => {
    console.log(template);
    const chatId = uuidv4();
    let vars = {};
    template.variables.forEach((variable) => {
      switch (variable.type) {
        case "TEXT":
          vars[variable.target] = variable;
          break;
        case "DOWNLOAD_URL":
          toasts.error("Not implemented yet - DOWNLOAD_URL variable type");
          return;
        // vars[variable.target] = "TODO";
        // break;
      }
    });
    const chatData = {
      messages: template.messagesPrompt.map((msg) => ({
        sender: msg.sender,
        text: format(msg.text, templatesVariables[template.id] || {}),
      })),
      systemPrompt: template.systemPrompt,
      name: "Chat from template: " + template.name,
    };
    await saveChat({ chatId, chatData });
    goto(`/chat/${chatId}`);
    ChatsListValid.set(false);
  };
</script>


<div class="flex w-full overflow-y-auto flex-wrap">
  {#each templates as template}
    <TemplateCreationBox {template} onCreate={() => startChatFromTemplate(template)}
                         variableValues={templatesVariables[template.id]} />
  {/each}
  {#if loadingTemplates}
    <div class="flex w-full mb-4">
      <div class="loading loading-sm m-auto" />
    </div>
  {/if}
</div>