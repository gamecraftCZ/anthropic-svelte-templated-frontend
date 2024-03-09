<script lang=ts>
import ChatMessage from '$lib/compoenents/ChatMessage.svelte';
import { SenderType } from '$lib/types';
import { getCompletion } from '$lib/aiUtils';
import { toasts } from 'svelte-toasts';

let systemPrompt = "";

let messages = [
	{ text: 'Hello', sender: SenderType.USER },
];

const addMessage = () => {
	let sender = SenderType.USER;
	if (messages.length > 0 && messages[messages.length - 1].sender === SenderType.USER) {
		sender = SenderType.ASSISTANT;
	}
	messages = [
		...messages,
		{ text: '', sender }
	];
};

const removeMessage = (i: number) => {
	messages = messages.filter((_, index) => index !== i);
};

let sendingMessages = false;
let submit = async () => {
	const prompt = messages.map(m => ({ role: m.sender === SenderType.USER ? 'user' : 'assistant', content: m.text }));

	for (const message of messages) {
		if (message.text == "") {
			toasts.error("No message can be empty");
			return;
		}
	}

	sendingMessages = true;
	const r = await getCompletion({
		model: 'claude-3-sonnet-20240229',
		prompt: prompt,
		systemPrompt
	});
	
	if (r.success) {
		toasts.success("Response generated");
		messages = [
			...messages,
			{ text: r.data.content[0].text.trim(), sender: SenderType.ASSISTANT },
			{ text: "", sender: SenderType.USER },
		];
	} else {
		toasts.error("Failed to generate response");
	}
	
	sendingMessages = false;
};
</script>

<div class="flex flex-col h-screen overflow-hidden">
	<div>
		<textarea class="w-full h-24 p-2 textarea bg-base-300" bind:value={systemPrompt} placeholder="System prompt" />
	</div>
	
	<div class="flex flex-col overflow-y-auto">
		{#each messages as message, i (i)}
			<ChatMessage bind:text={message.text} bind:sender={message.sender} onRemove={() => removeMessage(i)} />
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
