import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const updateUser = async ({ apiKey, token }: {
  apiKey: string,
  token?: string
}): Promise<{
  success: boolean,
  hasApiKey: boolean
}> => {
  
  try {
    const response = await fetch("/api/update-user", {
      method: "POST",
      body: JSON.stringify({
        token: token || get(UserToken),
        apiKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success, hasApiKey: (await response.json()).hasApiKey };

  } catch (e) {
    console.error("updateUser error", e);
    return { success: false, data: e };
  }
};