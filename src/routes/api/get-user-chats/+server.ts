import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { Chat, User } from "$lib/server/db";
import { UserToken } from "$lib/stores/auth";

export async function POST({ request }) {
	const { token } = await request.json();

	try {
		const chats = await Chat.findAll({
			where: { userToken: token },
		});
		
		return json({ data: chats }, { status: 200 });
		
	} catch (e) {
		console.log("/get-user-chats error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
