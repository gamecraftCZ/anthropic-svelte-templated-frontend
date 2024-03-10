import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { User } from "$lib/server/db";
import { UserToken } from "$lib/stores/auth";

export async function POST({ request }) {
	const { token } = await request.json();

	try {
		const user = await User.findOne({
			where: { token },
		});

		if (!user) return json({"error": "User not found"}, { status: 400 });
		
		return json({ hasApiKey: !!user.apiKey }, { status: 200 });
		
	} catch (e) {
		console.log("/get-user-info error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
