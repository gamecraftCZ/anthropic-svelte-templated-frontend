<script lang="ts">
  import { SenderType } from "$lib/types";
  import { CheckOutline, PenOutline, TrashBinSolid } from "flowbite-svelte-icons";
  import { slide } from "svelte/transition";
  import Markdown from "$lib/compoenents/Markdown.svelte";
  import { onMount } from "svelte";

  export let sender: SenderType;
  export let text: string;
  export let onRemove: (() => void) | undefined;
  export let defaultRendered = false;

  let rendered = defaultRendered;

  let textArea: HTMLTextAreaElement;

  const setTextAreaSize = () => {
    console.log("textArea: ", textArea);
    if (textArea) {
      textArea.style = "height: auto;";
      textArea.style = `height: ${textArea.scrollHeight + "px"};`;
    }
  };
  onMount(() => {
    setTextAreaSize();
  });
  $: if (!rendered && textArea) {
    setTextAreaSize();
  }
</script>

<div transition:slide class={`w-full mr-auto m-2
chat-${sender === SenderType.USER ? "start" : "end"} 
${sender === SenderType.USER ? "pr-20" : "pl-20"}
`}>
  <div class="chat-header w-full">
    {sender === SenderType.USER ? "User" : "AI"}
    <button on:click={onRemove} class="w-3 h-3">
      <TrashBinSolid size="sm" />
    </button>
    <button class="ml-4 w-4 h-4" on:click={() => rendered = !rendered}>
      {#if rendered}
        <PenOutline size="sm" />
      {:else}
        <CheckOutline size="sm" />
      {/if}
    </button>
  </div>
  <div class="chat-bubble w-full">
    <div class="overflow-x-auto box-border">
      {#if rendered}
        <Markdown source={text} />
      {:else}
        <textarea bind:this={textArea} on:input={setTextAreaSize}
                  class="textarea w-full bg-base-300/5 overflow-hidden resize-none" bind:value={text} />
      {/if}
    </div>
  </div>
</div>
