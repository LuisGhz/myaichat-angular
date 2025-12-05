import { Message } from './message.model';

export interface ChatStoreModel {
  messages: Message[];
  model: string;
  maxTokens: number;
  temperature: number;
}

export type ChatStoreOps = Partial<Omit<ChatStoreModel, 'messages'>>;
