import { Injectable, signal, computed } from '@angular/core';
import { PromptModel, PromptMessageModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  readonly #prompts = signal<PromptModel[]>([
    {
      id: '1',
      name: 'Code Review Assistant',
      content: 'You are a code review assistant that helps developers improve their code quality.',
      messages: [
        { id: '1-1', role: 'user', content: 'Review my code for best practices' },
        { id: '1-2', role: 'assistant', content: 'I will analyze your code for readability, performance, and maintainability.' },
      ],
    },
    {
      id: '2',
      name: 'Technical Writer',
      content: 'You are a technical writer that helps create clear documentation.',
      messages: [
        { id: '2-1', role: 'user', content: 'Help me write API documentation' },
        { id: '2-2', role: 'assistant', content: 'I will help you create comprehensive API documentation with examples.' },
      ],
    },
    {
      id: '3',
      name: 'Debug Helper',
      content: 'You are a debugging assistant that helps identify and fix bugs.',
      messages: [],
    },
  ]);

  readonly prompts = this.#prompts.asReadonly();

  readonly selectedPromptId = signal<string | null>(null);

  readonly selectedPrompt = computed(() => {
    const id = this.selectedPromptId();
    return id ? this.#prompts().find((p) => p.id === id) ?? null : null;
  });

  #generateId(): string {
    return crypto.randomUUID();
  }

  selectPrompt(id: string | null): void {
    this.selectedPromptId.set(id);
  }

  create(prompt: Omit<PromptModel, 'id'>): PromptModel {
    const newPrompt: PromptModel = {
      ...prompt,
      id: this.#generateId(),
      messages: prompt.messages.map((m) => ({ ...m, id: this.#generateId() })),
    };
    this.#prompts.update((prompts) => [...prompts, newPrompt]);
    return newPrompt;
  }

  update(id: string, prompt: Partial<Omit<PromptModel, 'id'>>): PromptModel | null {
    let updated: PromptModel | null = null;
    this.#prompts.update((prompts) =>
      prompts.map((p) => {
        if (p.id === id) {
          updated = { ...p, ...prompt };
          return updated;
        }
        return p;
      })
    );
    return updated;
  }

  delete(id: string): boolean {
    const initialLength = this.#prompts().length;
    this.#prompts.update((prompts) => prompts.filter((p) => p.id !== id));
    if (this.selectedPromptId() === id) {
      this.selectedPromptId.set(null);
    }
    return this.#prompts().length < initialLength;
  }

  getById(id: string): PromptModel | undefined {
    return this.#prompts().find((p) => p.id === id);
  }

  addMessage(promptId: string, message: Omit<PromptMessageModel, 'id'>): PromptMessageModel | null {
    const newMessage: PromptMessageModel = {
      ...message,
      id: this.#generateId(),
    };
    let success = false;
    this.#prompts.update((prompts) =>
      prompts.map((p) => {
        if (p.id === promptId) {
          success = true;
          return { ...p, messages: [...p.messages, newMessage] };
        }
        return p;
      })
    );
    return success ? newMessage : null;
  }

  removeMessage(promptId: string, messageId: string): boolean {
    let success = false;
    this.#prompts.update((prompts) =>
      prompts.map((p) => {
        if (p.id === promptId) {
          const filtered = p.messages.filter((m) => m.id !== messageId);
          if (filtered.length < p.messages.length) {
            success = true;
            return { ...p, messages: filtered };
          }
        }
        return p;
      })
    );
    return success;
  }

  updateMessage(promptId: string, messageId: string, message: Partial<Omit<PromptMessageModel, 'id'>>): PromptMessageModel | null {
    let updated: PromptMessageModel | null = null;
    this.#prompts.update((prompts) =>
      prompts.map((p) => {
        if (p.id === promptId) {
          return {
            ...p,
            messages: p.messages.map((m) => {
              if (m.id === messageId) {
                updated = { ...m, ...message };
                return updated;
              }
              return m;
            }),
          };
        }
        return p;
      })
    );
    return updated;
  }
}
