import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { User } from "$lib/server/db";
import { UserToken } from "$lib/stores/auth";

export async function POST({ request }) {
	const { token, apiKey } = await request.json();

	if (!token) return json({"error": "Token parameter is required"}, { status: 400 });
	
	try {
		const [user, created] = await User.findOrCreate({
			where: { token },
			defaults: {
				apiKey: "",
			}
		});

		user.token = token;
		user.apiKey = apiKey;
		await user.save();
		console.log(user);
		
		return json({ hasApiKey: !!user.apiKey }, { status: 200 });
		
	} catch (e) {
		console.log("/update-user error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
