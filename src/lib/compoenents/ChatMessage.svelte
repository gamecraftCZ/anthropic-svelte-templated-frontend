<script lang="ts">
  import { SenderType } from "$lib/types";
  import { CheckOutline, PenOutline, TicketOutline, TicketSolid, TrashBinSolid } from "flowbite-svelte-icons";
  import { slide } from "svelte/transition";
  import SvelteMarkdown from "svelte-markdown";
  import Markdown from "$lib/compoenents/Markdown.svelte";

  export let sender: SenderType;
  export let text: string;
  export let onRemove: (() => void) | undefined;
  export let defaultRendered = false;
  
  let rendered = defaultRendered;
</script>

<div transition:slide class={`chat chat-${sender === SenderType.USER ? "end" : "start"} w-full`}>
  <div class="chat-header w-full">
    {sender === SenderType.USER ? "User" : "AI"}
    <button on:click={onRemove} class="w-3 h-3">
      <TrashBinSolid size="sm" />
    </button>
    <button class="ml-4" on:click={() => rendered = !rendered} >
      {#if rendered}
        <PenOutline size="sm"/>
      {:else}
        <CheckOutline size="sm"/>
      {/if}
    </button>
  </div>
  <div class="chat-bubble w-full">
    <div class="overflow-x-auto box-border">
      {#if rendered}
        <Markdown class="overflow-hidden box-border" source={text} />
      {:else}
        <textarea class="textarea w-full bg-base-300/5 overflow-hidden" bind:value={text} />
      {/if}
    </div>
  </div>
</div>
