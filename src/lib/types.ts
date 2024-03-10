export enum SenderType { USER, ASSISTANT }
export type Template = {
	id: string;
	name: string;
	description: string;
	systemPrompt: string;
	prompt: any[];
	variables: { target: string, prompt: string, type: "DOWNLOAD_URL"}[];// | "TEXT" }[];
};