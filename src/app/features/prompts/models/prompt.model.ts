export interface PromptMessageModel {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

export interface PromptModel {
  id: string;
  name: string;
  content: string;
  messages: PromptMessageModel[];
}
