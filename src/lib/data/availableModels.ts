export type AvailableModel = { id: string, name: string };
export const availableModels: AvailableModel[] = [
  { id: "claude-3-5-sonnet-latest", name: "Claude Sonnet 3.5"},
  { id: "claude-3-5-haiku-latest", name: "Claude Haiku 3.5"},
  { id: "claude-3-opus-latest", name: "Claude Opus 3.0"},
  { id: "claude-3-sonnet-latest", name: "Claude Sonnet 3.0"},
  { id: "claude-3-haiku-latest", name: "Claude haiku 3.0"},
];

export const defaultModel = availableModels[0];

export const availableModelsMap = availableModels.reduce((acc, model) => {
  acc[model.id] = model;
  return acc;
}, {} as Record<string, AvailableModel>);
