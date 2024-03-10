import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { Chat, Template, User } from "$lib/server/db";
import { UserToken } from "$lib/stores/auth";

export async function POST({ request }) {
	const { token, templateId, templateData } = await request.json();

	try {
		const [template, created] = await Template.findOrCreate({
			where: { templateId },
		});
		
		if (templateData !== undefined) template.dataJson = templateData;
		if (token !== undefined) template.userToken = token;
		await template.save();

		return json({ data: template.dataJson }, { status: 200 });

	} catch (e) {
		console.log("/save-template error: ", e);
		return json({"error": "something"}, { status: 400 });
	}
}
