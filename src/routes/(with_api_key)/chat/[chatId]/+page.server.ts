import { error, json } from "@sveltejs/kit";
import { SenderType } from "$lib/types";
import { Chat } from "$lib/server/db";
import { page } from "$app/stores";

export async function load({ params }: { params: { chatId?: string }}) {
  if (!params.chatId) {
    return {"error": "Empty chat ID"};
  }
  try {
    const [chat, created] = await Chat.findOrCreate({
      where: { chatId: params.chatId },
      defaults: {
        chatId: params.chatId,
        dataJson: JSON.stringify({}),
      }
    });

    return { success: true, chatId: params.chatId, data: JSON.parse(chat.dataJson || "{}") };

  } catch (e) {
    console.log("/completion error: ", e);
    return { success: false };
  }
}