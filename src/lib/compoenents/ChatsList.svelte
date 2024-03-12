<script lang="ts">
  import { ChatsListValid } from "$lib/stores/invalidations";
  import { getUserChats } from "$lib/api/getUserChats";
  import { toasts } from "svelte-toasts";
  import { IsLoggedIn } from "$lib/stores/auth";
  import { TrashBinOutline, TrashBinSolid } from "flowbite-svelte-icons";
  import { removeChat } from "$lib/api/removeChat";
  import { slide } from "svelte/transition";
  
  let chats: {chatId: string, name: string}[] = [];
  let loadingChats = false;
  
  const loadChats = async () => {
    loadingChats = true;

    const r = await getUserChats({});
    if (r.success) {
      chats = r.data.map((c) => ({ chatId: c.chatId, name: c.data.name })).reverse();
    } else {
      toasts.error("Error loading new chats list");
    }

    ChatsListValid.set(true);
    loadingChats = false;
  };
  
  $: if (!$ChatsListValid && !loadingChats) {
    loadChats();
  }
  
  $: if (!$ChatsListValid && !$IsLoggedIn) {
    chats = [];
  }
  
  const removeChatCallback = async (chat) => {
    const r = await removeChat({chatId: chat.chatId});
    if (r.success) chats = chats.filter(c => c.chatId != chat.chatId);
    else toasts.error("Error removing chat");
  }
</script>


<div class="flex flex-col overflow-hidden">
  {#if loadingChats}
    <div class="flex w-full mb-4">
    <div class="loading loading-sm m-auto" />
    </div>
  {/if}
  
  {#each chats as chat}
    <div class="flex mt-0 mb-2 w-full content-center" transition:slide>
      <a class="btn flex-1" href={`/chat/${chat.chatId}`}>{chat.name}</a>
      <button class="w-5 h-5" on:click={() => removeChatCallback(chat)}><TrashBinSolid/></button>
    </div>
  {/each}
  {#if !loadingChats && chats.length === 0}
    <p>No chats found</p>
  {/if}
</div>
