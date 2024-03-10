<script lang="ts">
  import { goto } from "$app/navigation";
  import { UserToken, IsLoggedIn } from "$lib/stores/auth";
  import ChatsList from "$lib/compoenents/ChatsList.svelte";
  import { BarsFromLeftOutline, CloseOutline } from "flowbite-svelte-icons";
  import { ChatsListValid } from "$lib/stores/invalidations";

  $: if (!$IsLoggedIn) {
    goto("/auth");
  }

  let sidePanelOpened = false;
</script>

<div class="flex h-screen">
  <!-- left panel -->
  {#if sidePanelOpened}
    <div class="flex flex-col min-w-64 max-w-64 m-1 p-3 bg-base-300 rounded">
      <div class="mb-4">
        <span class="font-bold">Chats</span>
        <a class="ml-2 btn" href="/new-chat">new</a>
        <button class="btn ml-10 w-12 h-12 p-0" on:click={() => {sidePanelOpened = false; ChatsListValid.set(false)}}><CloseOutline size="md"/></button>
      </div>
      <div class="overflow-x-auto">
        <ChatsList />
      </div>
      <div class="flex flex-col items-center mt-auto">
        <!--			<a class="cursor-pointer mt-2 font-light" href="/templates">Templates</a>-->
        <a class="cursor-pointer mt-2 font-light" href="/settings">Settings</a>
        <button class="cursor-pointer mt-2 font-extralight" on:click={() => UserToken.set("")}>Logout</button>
      </div>
    </div>
  {:else}
    <button class="btn fixed m-4 w-12 h-12 p-0" on:click={() => {sidePanelOpened = true; ChatsListValid.set(false)}}><BarsFromLeftOutline size="lg"/></button>
  {/if}
  <!-- content -->
  <div class="flex-1 flex flex-col m1 p-3 w-">
    <slot />
  </div>
</div>