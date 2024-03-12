<script lang="ts">
  import type { Template } from "$lib/types";
  import { v4 as uuidv4 } from "uuid";
  import { toasts } from "svelte-toasts";
  import format from "string-format";
  import { saveChat } from "$lib/api/saveChat";
  import { goto } from "$app/navigation";
  import { ChatsListValid } from "$lib/stores/invalidations";
  import TemplateCreationBox from "$lib/compoenents/TemplateCreationBox.svelte";
  import { defaultTemplates } from "$lib/data/defaultTemplates";
  import { getUserTemplates } from "$lib/api/getUserTemplates";
  import { availableModelsMap } from "$lib/data/availableModels";
  import { removeTemplate } from "$lib/api/removeTemplate";

  let templates: Template[] = [...defaultTemplates];
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
        variables: [],
      })).reverse(), ...defaultTemplates];
    } else {
      toasts.error("Error loading new chats list");
    }

    loadingTemplates = false;
  };

  $: loadTemplates();

  //
  const templatesVariables: { [id: string]: { [target: string]: string } } = {};

  $: templates.forEach((template) => {
    templatesVariables[template.id] ??= {};
    template.variables.forEach((variable) => {
      templatesVariables[template.id][variable.target] ??= "";
    });
  });

  const startChatFromTemplate = async (template: Template) => {
    console.log(template);
    const chatId = uuidv4();
    let varValues: { [target: string]: string } = {};
    template.variables.forEach((variable) => {
      switch (variable.type) {
        case "TEXT":
          varValues[variable.target] = templatesVariables[template.id][variable.target];
          break;
        case "DOWNLOAD_URL":
          toasts.error("Not implemented yet - DOWNLOAD_URL variable type");
          return;
        // varValues[variable.target] = "TODO";
        // break;
      }
    });
    console.log("msg.text", template.messagesPrompt);
    console.log("vars", varValues);
    const chatData = {
      messages: template.messagesPrompt.map((msg) => ({
        sender: msg.sender,
        text: format(msg.text, varValues || {}),
      })),
      systemPrompt: template.systemPrompt,
      model: availableModelsMap["sonnet"].id,
      name: "Chat from template: " + template.name,
    };
    await saveChat({ chatId, chatData });
    goto(`/chat/${chatId}`);
    ChatsListValid.set(false);
  };

  const removeTemplateCallback = async (template: Template) => {
    const r = await removeTemplate({ templateId: template.id });

    if (r.success) templates = templates.filter((t) => t.id !== template.id);
    else toasts.error("Error removing template");
    
  };
</script>


<div class="flex w-full overflow-y-auto flex-wrap">
  {#each templates as template}
    <TemplateCreationBox {template} onCreate={() => startChatFromTemplate(template)}
                         variableValues={templatesVariables[template.id]}
                         removeTemplateCallback={template.default ? null : removeTemplateCallback} />
  {/each}
  {#if loadingTemplates}
    <div class="flex w-full mb-4">
      <div class="loading loading-sm m-auto" />
    </div>
  {/if}
</div>
