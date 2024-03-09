import { derived } from 'svelte/store';
import { createLocalStorageStore } from './utils';
import Anthropic from '@anthropic-ai/sdk';
import { getCompletion } from '$lib/aiUtils';

export const ApiKey = createLocalStorageStore('AuthToken');

export const IsLoggedIn = derived(ApiKey, ($ApiKey, set) => {
	const updateIsLoggedIn = async () => {
		console.log(`KEY: '${!!$ApiKey}'`);
		set(!!$ApiKey);
	};

	updateIsLoggedIn();
}, false);

export const checkApiKeyValidity = async (apiKey: string): Promise<boolean> => {
	try {
		return (await getCompletion({
			model: 'claude-3-sonnet-20240229',
			prompt: [{ role: 'user', content: 'Hello, Claude' }],
			apiKey
		})).success;
		
	} catch (e) {
		console.error('Error while checking API key validity', e);
		return false;
	}
};
