import { json } from "@sveltejs/kit";
import { Template } from "$lib/server/db";

export async function POST({ request }) {
  const { token, templateId } = await request.json();

  try {
    const template = await Template.findOne({
      where: { templateId },
    });

    await template?.destroy();

    return json({}, { status: 200 });

  } catch (e) {
    console.log("/remove-template error: ", e);
    return json({ "error": "something" }, { status: 400 });
  }
}
