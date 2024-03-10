import { get } from 'svelte/store';
import { UserToken } from '$lib/stores/auth';

export const getCompletion = async ({ model, prompt, maxTokens, systemPrompt, apiKey }: {
	model: string,
	prompt: any[],
	maxTokens?: number,
	systemPrompt?: string,
	apiKey?: string, 
}): Promise<{ success: boolean, data: any }> => {
	try {
		const response = await fetch('/api/completion', {
			method: 'POST',
			body: JSON.stringify({
				token: get(UserToken),
				apiKey: apiKey,
				requestData: { model, prompt, maxTokens: maxTokens ?? 1024, systemPrompt }
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const success = response.status === 200;
		return { success, data: await response.json() };

	} catch (e) {
		console.error("getCompetion error", e);
		return { success: false, data: e };
	}
};