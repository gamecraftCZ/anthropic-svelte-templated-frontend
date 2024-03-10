export enum SenderType { USER = "user", ASSISTANT = "assistant" }
export type Template = {
	id: string;
	name: string;
	description: string;
	systemPrompt: string;
	messagesPrompt: any[];
	variables: { target: string, prompt: string, type: "DOWNLOAD_URL" | "TEXT" }[];
};