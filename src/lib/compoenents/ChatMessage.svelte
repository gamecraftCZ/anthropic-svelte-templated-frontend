<script lang="ts">
	import { SenderType } from '$lib/types';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { slide } from 'svelte/transition';

	export let sender: SenderType; 
	export let text: string;
	export let onRemove: (() => void) | undefined;
</script>

<div transition:slide class={`chat chat-${sender === SenderType.USER ? "end" : "start"} w-full`}>
	<div class="chat-header w-full">
		{sender === SenderType.USER ? "User" : "AI"}
		<button on:click={onRemove} class="w-3 h-3"><TrashBinSolid size="sm"/></button>
	</div>
	<div class="chat-bubble w-full">
		<textarea class="textarea w-full bg-base-300/5" bind:value={text}/>
	</div>
</div>
