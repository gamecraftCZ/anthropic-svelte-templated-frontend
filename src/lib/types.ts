export enum SenderType { USER = "user", ASSISTANT = "assistant" }

export type TemplateVariable = {
  target: string;
  prompt: string;
  type: "DOWNLOAD_URL" | "TEXT";
};

export type Message = {
  sender: SenderType;
  text: string;
};

export type Template = {
  id: string;
  default?: boolean;
  name: string;
  description: string;
  systemPrompt: string;
  messagesPrompt: Message[];
  variables: TemplateVariable[];
};