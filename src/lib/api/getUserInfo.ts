import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const getUserInfo = async ({ token }: { token?: string, }): Promise<{
  success: boolean,
  data: { hasApiKey: boolean }
}> => {
  try {
    const response = await fetch("/api/get-user-info", {
      method: "POST",
      body: JSON.stringify({
        token: token !== undefined ? token : get(UserToken),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success, data: await response.json() };

  } catch (e) {
    console.error("getUserInfo error", e);
    return { success: false, data: e };
  }
};