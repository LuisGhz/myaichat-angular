import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '@core/services/layout.service';
import { InputMessage } from '@chat/components/input/input-message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AiModelsApi } from '@chat/services/ai-models-api';
import { AiModelModel } from '@chat/models';

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, NzSelectModule, InputMessage],
  templateUrl: './chat-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {
  protected readonly layoutService = inject(LayoutService);
  #aiModelsApi = inject(AiModelsApi);
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
