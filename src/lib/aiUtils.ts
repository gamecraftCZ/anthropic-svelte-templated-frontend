import { get } from 'svelte/store';
import { ApiKey } from '$lib/stores/auth';

export const getCompletion = async ({ model, prompt, apiKey, maxTokens }: {
	model: string,
	prompt: any[],
	apiKey?: string,
	maxTokens?: number
}): Promise<{ success: boolean, response: any }> => {
	try {
		const response = await fetch('/api/completion', {
			method: 'POST',
			body: JSON.stringify({
				apiKey: apiKey !== undefined ? apiKey : get(ApiKey),
				requestData: { model, prompt, maxTokens: maxTokens ?? 1024 }
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const success = response.status === 200;
		return { success, response: response.json() };

	} catch (e) {
		console.error('Error while getting completion', e);
		return { success: false, response: e };
	}
};