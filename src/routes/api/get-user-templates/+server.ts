import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { Chat, Template, User } from "$lib/server/db";
import { UserToken } from "$lib/stores/auth";

export async function POST({ request }) {
	const { token } = await request.json();

	try {
		const templates = await Template.findAll({
			where: { userToken: token },
		});
		
		return json({ data: templates }, { status: 200 });
		
	} catch (e) {
		console.log("/get-user-templates error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
