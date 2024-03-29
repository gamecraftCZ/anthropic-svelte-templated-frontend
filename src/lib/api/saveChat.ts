import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const saveChat = async ({ chatId, chatData, token }: {
  chatId: string,
  chatData?: any,
  token?: string
}): Promise<{
  success: boolean,
  data: any
}> => {
  try {
    const response = await fetch("/api/save-chat", {
      method: "POST",
      body: JSON.stringify({
        token: token !== undefined ? token : get(UserToken),
        chatId,
        chatData: JSON.stringify(chatData || {}),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success, data: JSON.parse((await response.json().data) || "{}") };

  } catch (e) {
    console.error("saveChat error", e);
    return { success: false, data: e };
  }
};