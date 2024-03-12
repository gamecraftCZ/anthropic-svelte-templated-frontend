<script lang="ts">
  import { toasts } from "svelte-toasts";
  import { SenderType, type Template } from "$lib/types";
  import { goto } from "$app/navigation";
  import { v4 as uuidv4 } from "uuid";
  import { ChatsListValid } from "$lib/stores/invalidations";
  import { saveChat } from "$lib/api/saveChat";
  import format from 'string-format';
  import TemplateCreationBox from "$lib/compoenents/TemplateCreationBox.svelte";
  import TemplatesSelect from "$lib/compoenents/TemplatesSelect.svelte";
  import { availableModels, availableModelsMap } from "$lib/data/availableModels";


  const startEmptyChat = async () => {
    const chatId = uuidv4();
    // toasts.success("New empty chat started with id: " + chatId);
    const chatData = {
      messages: [{ "sender": SenderType.USER, "text": "" }],
      model: availableModelsMap["sonnet"].id,
      systemPrompt: "",
      name: ".chat.",
    };
    await saveChat({ chatId, chatData });
    goto(`/chat/${chatId}`);
    ChatsListValid.set(false);
  };

</script>

<div class="flex-grow flex items-center flex-col mt-5 overflow-hidden">
  <div class="flex justify-center items-center">
    <span class="text-xl font-bold ">New chat from template</span>
    <span class="m-5">OR</span>
    <button class="btn" on:click={startEmptyChat}>New empty chat</button>
  </div>
  <TemplatesSelect/>
</div>
