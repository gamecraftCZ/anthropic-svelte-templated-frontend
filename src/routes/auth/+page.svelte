<script lang="ts">
	import { ApiKey, checkApiKeyValidity } from '$lib/stores/auth';
	import { toasts } from 'svelte-toasts';

	let apiKeyInput = "";
	let checkingValidity = false;
	
	const submit = async () => {
		if (apiKeyInput && !checkingValidity) {
			checkingValidity = true;
			if (await checkApiKeyValidity(apiKeyInput)) {
				ApiKey.set(apiKeyInput);
				toasts.success("API key validated successfully", { duration: 5_000 });
			} else {
				console.warn("Invalid API key or validation failed");
				toasts.error("Invalid API key or validation failed", { duration: 5_000 });
				checkingValidity = false;
			}
		}
	};
</script>

<div class="flex-grow flex items-center flex-col justify-center">
	<form class="mx-auto max-w-sm" on:submit={submit}>
		<input type="text" class="input input-bordered w-full mb-2" disabled={checkingValidity} bind:value={apiKeyInput} placeholder="API Key" />
		<button class="btn btn-primary w-full" disabled={checkingValidity || !apiKeyInput} type="submit">
			{#if checkingValidity}
				<div class="loading loading-sm" />
			{/if}
			Submit
		</button>
		
	</form>
</div>
