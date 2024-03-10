import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const getChat = async ({ chatId, chatData, token }: {
  chatId: string,
  token?: string
}): Promise<{
  success: boolean,
  data: any
}> => {
  try {
    const response = await fetch("/api/get-chat", {
      method: "POST",
      body: JSON.stringify({
        token: token !== undefined ? token : get(UserToken),
        chatId,
        chatData: JSON.stringify(chatData),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success, data: ((await response.json()).data) };

  } catch (e) {
    console.error("getChat error", e);
    return { success: false, data: e };
  }
};
