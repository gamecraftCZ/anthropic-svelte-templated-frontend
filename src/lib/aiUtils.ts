import { get } from 'svelte/store';
import { ApiKey } from '$lib/stores/auth';

export const getCompletion = async ({ model, prompt, apiKey, maxTokens, systemPrompt }: {
	model: string,
	prompt: any[],
	apiKey?: string,
	maxTokens?: number,
	systemPrompt?: string
}): Promise<{ success: boolean, data: any }> => {
	try {
		const response = await fetch('/api/completion', {
			method: 'POST',
			body: JSON.stringify({
				apiKey: apiKey !== undefined ? apiKey : get(ApiKey),
				requestData: { model, prompt, maxTokens: maxTokens ?? 1024, systemPrompt }
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const success = response.status === 200;
		return { success, data: await response.json() };

	} catch (e) {
		console.error('Error while getting completion', e);
		return { success: false, data: e };
	}
};