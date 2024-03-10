import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { Chat, User } from "$lib/server/db";
import { UserToken } from "$lib/stores/auth";

export async function POST({ request }) {
	const { token, chatId } = await request.json();

	try {
		const chat = await Chat.findOne({
			where: { userToken: token, chatId },
		});

		if (!chat) return json({"error": "Chat not found"}, { status: 400 });
		
		return json({ data: chat.dataJson }, { status: 200 });

	} catch (e) {
		console.log("/get-chat error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
