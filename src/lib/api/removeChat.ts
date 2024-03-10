import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const removeChat = async ({ chatId, token }: {
  chatId: string,
  token?: string
}): Promise<{
  success: boolean
}> => {
  try {
    const response = await fetch("/api/remove-chat", {
      method: "POST",
      body: JSON.stringify({
        token: token !== undefined ? token : get(UserToken),
        chatId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success };

  } catch (e) {
    console.error("removeChat error", e);
    return { success: false, data: e };
  }
};
