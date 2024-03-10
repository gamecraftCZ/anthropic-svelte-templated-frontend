import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const getUserChats = async ({ token }: { token?: string, }): Promise<{
  success: boolean,
  data: { chatId: string, data: any }[]
}> => {
  try {
    const response = await fetch("/api/get-user-chats", {
      method: "POST",
      body: JSON.stringify({
        token: token !== undefined ? token : get(UserToken),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success, data: (await response.json()).data
        .map(c => ( {chatId: c.chatId, data: JSON.parse(c.dataJson || "{}")} ))
    };

  } catch (e) {
    console.error("getUserChats error", e);
    return { success: false, data: e };
  }
};