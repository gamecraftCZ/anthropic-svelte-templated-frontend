import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const removeTemplate = async ({ templateId, token }: {
  templateId: string,
  token?: string
}): Promise<{
  success: boolean
}> => {
  try {
    const response = await fetch("/api/remove-template", {
      method: "POST",
      body: JSON.stringify({
        token: token !== undefined ? token : get(UserToken),
        templateId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success };

  } catch (e) {
    console.error("removeTemplate error", e);
    return { success: false, data: e };
  }
};
