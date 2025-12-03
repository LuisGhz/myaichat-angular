import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '@core/services/layout.service';
import { InputMessage } from '@chat/components/input/input-message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AiModelsApi } from '@chat/services/ai-models-api';
import { AiModelModel } from '@chat/models';
import { select } from '@ngxs/store';
import { ChatStore } from '@st/chat/chat.store';
import { Messages } from '@chat/components/messages/messages';
import { ChatApi } from '@chat/services/chat-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, NzSelectModule, InputMessage, Messages],
  templateUrl: './chat-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit {
  protected readonly layoutService = inject(LayoutService);
  #activatedRoute = inject(ActivatedRoute);
  #chatApi = inject(ChatApi);
  #aiModelsApi = inject(AiModelsApi);
  messages = select(ChatStore.getMessages);

  // Señal para controlar si es un chat cargado desde ruta
  #isLoadedChat = signal(false);

  // Solo animar si no es un chat cargado desde ruta (es un chat nuevo)
  protected shouldAnimateTransition = computed(() => !this.#isLoadedChat());

  prompts = signal<
    {
      id: string;
      name: string;
    }[]
  >([
    {
      id: '1',
      name: 'Default',
    },
    {
      id: '2',
      name: 'Creative',
    },
  ]);

  models = resource({
    loader: () => this.#aiModelsApi.getAiModels(),
    defaultValue: [],
  });

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe((params) => {
      const chatId = params['id'];
      if (chatId) {
        // Marcar que es un chat cargado para evitar animación de transición
        this.#isLoadedChat.set(true);
        this.#chatApi.loadMessages(chatId);
      } else {
        // Es un chat nuevo, habilitar animaciones de transición
        this.#isLoadedChat.set(false);
      }
    });
  }

  groupedModels = computed(() => {
    const modelList = this.models.value();
    const grouped = new Map<string, AiModelModel[]>();

    modelList.forEach((model) => {
      const developerName = model.developer.name;
      if (!grouped.has(developerName)) {
        grouped.set(developerName, []);
      }
      grouped.get(developerName)!.push(model);
    });

    return grouped;
  });
}
