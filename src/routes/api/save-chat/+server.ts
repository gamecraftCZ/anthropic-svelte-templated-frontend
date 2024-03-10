import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { Chat, User } from "$lib/server/db";
import { UserToken } from "$lib/stores/auth";

export async function POST({ request }) {
	const { token, chatId, chatData } = await request.json();

	try {
		const [chat, created] = await Chat.findOrCreate({
			where: { chatId },
		});
		
		if (chatData !== undefined) chat.dataJson = chatData;
		if (token !== undefined) chat.userToken = token;
		await chat.save();

		return json({ data: chat.dataJson }, { status: 200 });

	} catch (e) {
		console.log("/save-chat error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
