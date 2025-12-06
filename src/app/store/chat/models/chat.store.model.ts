import { Message } from './message.model';

export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface ChatStoreModel {
  messages: Message[];
  model: string;
  maxTokens: number;
  temperature: number;
  file?: FileInfo;
  currentChatId?: string | null;
  isImageGeneration: boolean;
  isWebSearch: boolean;
  messageText: string;
}

export interface AssistantMessageChunk {
  content: string;
  imageUrl?: string;
}

export type ChatStoreOps = Partial<Omit<ChatStoreModel, 'messages'>>;
