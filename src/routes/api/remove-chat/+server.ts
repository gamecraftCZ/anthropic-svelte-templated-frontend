import { json } from "@sveltejs/kit";
import { Chat } from "$lib/server/db";

export async function POST({ request }) {
  const { token, chatId } = await request.json();

  try {
    const chat = await Chat.findOne({
      where: { chatId },
    });

    console.log("removeChat: ", chat);
    await chat?.destroy();

    return json({}, { status: 200 });

  } catch (e) {
    console.log("/remove-chat error: ", e);
    return json({ "error": "something" }, { status: 400 });
  }
}
