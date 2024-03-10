import { get } from "svelte/store";
import { UserToken } from "$lib/stores/auth";

export const saveTemplate = async ({ templateId, templateData, token }: {
  templateId: string,
  templateData?: any,
  token?: string
}): Promise<{
  success: boolean,
  data: any
}> => {
  try {
    const response = await fetch("/api/save-template", {
      method: "POST",
      body: JSON.stringify({
        token: token !== undefined ? token : get(UserToken),
        templateId,
        templateData: JSON.stringify(templateData || {}),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = response.status === 200;
    return { success, data: JSON.parse((await response.json().data) || "{}") };

  } catch (e) {
    console.error("saveTemplate error", e);
    return { success: false, data: e };
  }
};