export interface MessageModel {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatModel {
  id: string;
  title: string;
  messages: MessageModel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatGroupModel {
  label: string;
  chats: ChatModel[];
}
