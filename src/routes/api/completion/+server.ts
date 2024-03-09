import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';

export async function POST({ request }) {
	try {
		const { apiKey, requestData } = await request.json();
		console.log(requestData);
		const { model, maxTokens, prompt, systemPrompt } = requestData;
		
		const anthropic = new Anthropic({
			apiKey: apiKey, // defaults to process.env["ANTHROPIC_API_KEY"]
		});
		
		const response = await anthropic.messages.create({
			model: model,
			max_tokens: maxTokens,
			messages: prompt,
			system: systemPrompt
		});
		return json(response, { status: 200 });
		
	} catch (e) {
		console.log("/completion error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
