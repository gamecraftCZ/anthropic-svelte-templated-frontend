import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { User } from "$lib/server/db";

export async function POST({ request }) {
	try {
		const { token, requestData, apiKey } = await request.json();

		const user = await User.findOne({
			where: { token },
		});
		if (!user) return json({"error": "User not found"}, { status: 400 });

		const { model, maxTokens, prompt, systemPrompt } = requestData;

		const anthropic = new Anthropic({
			apiKey: apiKey || user.apiKey, // defaults to process.env["ANTHROPIC_API_KEY"]
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
