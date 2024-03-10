<script lang="ts">
  import { ChatsListValid } from "$lib/stores/invalidations";
  import { getUserChats } from "$lib/api/getUserChats";
  import { toasts } from "svelte-toasts";
  import { IsLoggedIn } from "$lib/stores/auth";

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
</script>


<div class="flex flex-col overflow-hidden">
  {#if loadingChats}
    <div class="flex w-full mb-4">
    <div class="loading loading-sm m-auto" />
    </div>
  {/if}
  
  {#each chats as chat}
    <a class="btn mb-2" href={`/chat/${chat.chatId}`}>{chat.name}</a>
  {/each}

  {#if !loadingChats && chats.length === 0}
    <p>No chats found</p>
  {/if}
</div>
