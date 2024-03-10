<script lang="ts">
  import ChatMessage from "$lib/compoenents/ChatMessage.svelte";
  import { SenderType } from "$lib/types";
  import { getCompletion } from "$lib/api/getCompletion";
  import { toasts } from "svelte-toasts";
  import { onMount } from "svelte";
  import { saveChat } from "$lib/api/saveChat";
  import { ChatsListValid } from "$lib/stores/invalidations";
  import { saveTemplate } from "$lib/api/saveTemplate";
  import { v4 as uuidv4 } from "uuid";
  import { goto } from "$app/navigation";

  export let data: {
    success: boolean,
    chatId: string,
    data?: { systemPrompt: string, name: string, messages: { text: string, sender: SenderType }[] }
  };
  
  let lastChatId: string | null = null;
  let originalname = data.data?.name || ".chat.";
  
  const saveChatData = async (chatId_, messages_, systemPrompt_, name_, originalname_) => {
    await saveChat({ chatId: chatId_, chatData: { messages: messages_, systemPrompt: systemPrompt_, name: name_ } });
    if (originalname_ != name_) {
      originalname = name;
      ChatsListValid.set(false);
    }
  };

  const saveAsTemplate = async () => {
    const templateId = uuidv4();
    const r = await saveTemplate({ templateId, templateData: { messages, systemPrompt, name } })
    if (r.success) {
      toasts.success("Template was created")
      goto("/new-chat");
    } else {
      toasts.error("Template creation failed")
    }
  };
  
  $: if (data.success) {
    onMount(() => {
      // Some onMount things
      // ...
      // OnUnmount()
      return async () => {
        saveChatData(data.chatId, messages, systemPrompt, name, originalname)
      };
    });
  }
  
  $: if (lastChatId !== data.chatId) {
    if (lastChatId) {
      saveChatData(lastChatId, messages, systemPrompt, name, originalname);
    }

    name = data.data?.name || ".chat.";
    systemPrompt = data.data?.systemPrompt || "";
    messages = data.data?.messages || [{ sender: SenderType.USER, text: "" }];

    originalname = name;
    lastChatId = data.success ? data.chatId : null;
  }
  
  let loadError = data.success ? "" : "Failed to load chat data.";
  let systemPrompt = data.data?.systemPrompt || "";
  let name = data.data?.name || ".chat.";
  let messages = data.data?.messages || [{ sender: SenderType.USER, text: "" }];

  const addMessage = () => {
    let sender = SenderType.USER;
    if (messages.length > 0 && messages[messages.length - 1].sender === SenderType.USER) {
      sender = SenderType.ASSISTANT;
    }
    messages = [
      ...messages,
      { text: "", sender },
    ];
  };

  const removeMessage = (i: number) => {
    messages = messages.filter((_, index) => index !== i);
  };

  let sendingMessages = false;
  let submit = async () => {
    const prompt = messages.map(m => ({ role: m.sender === SenderType.USER ? "user" : "assistant", content: m.text }));

    for (const message of messages) {
      if (message.text == "") {
        toasts.error("No message can be empty");
        return;
      }
    }

    sendingMessages = true;
    const r = await getCompletion({
      model: "claude-3-sonnet-20240229",
      prompt: prompt,
      systemPrompt,
    });

    if (r.success) {
      toasts.success("Response generated");
      messages = [
        ...messages,
        { text: r.data.content[0].text.trim(), sender: SenderType.ASSISTANT },
        { text: "", sender: SenderType.USER },
      ];
      await saveChatData(data.chatId, messages, systemPrompt, name, originalname);
    } else {
      toasts.error("Failed to generate response");
    }

    sendingMessages = false;
  };
</script>

{#if loadError}
  <span class="text-xl text-red-500">{loadError}</span>

{:else}
  <div class="flex flex-col h-screen overflow-hidden">
    <div>
      <input type="text" class="w-96 h-8 p-2 m-2 input bg-base-300" bind:value={name} placeholder="Chat name" />
      <button class="btn m-2" on:click={saveAsTemplate}>Save as template</button>
    </div>
    
    <div>
      <textarea class="w-full h-24 p-2 textarea bg-base-300" bind:value={systemPrompt} placeholder="System prompt" />
    </div>

    <div class="flex flex-col overflow-y-auto chat w-full overflow-x-hidden">
      {#each messages as message, i (i)}
        <ChatMessage bind:text={message.text} bind:sender={message.sender} onRemove={() => removeMessage(i)}
                     defaultRendered={i !== messages.length - 1} />
      {/each}
    </div>

    <div class="flex mt-auto justify-between pr-2 py-2">
      <button class="w-12 h-12 btn" on:click={addMessage}>+</button>
      <button class="px-4 py-2 btn btn-primary" on:click={submit} disabled={sendingMessages}>
        {#if sendingMessages}
          <div class="loading loading-sm" />
        {/if}
        Submit
      </button>
    </div>
  </div>
{/if}