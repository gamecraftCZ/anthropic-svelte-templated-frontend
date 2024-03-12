export type AvailableModel = { id: string, name: string, apiId: string }; 
export const availableModels: AvailableModel[] = [
  { id: "opus", name: "Claude Opus (best)", apiId: "claude-3-opus-20240229" },
  { id: "sonnet", name: "Claude Sonnet (good)", apiId: "claude-3-sonnet-20240229" },
  { id: "haiku", name: "Claude haiku (cheap) (NOT YET AVAILABLE)", apiId: "" },
];

export const availableModelsMap = availableModels.reduce((acc, model) => {
  acc[model.id] = model;
  return acc;
}, {} as Record<string, AvailableModel>);
