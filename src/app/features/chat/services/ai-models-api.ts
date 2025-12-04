import { Injectable } from '@angular/core';
import { AiModelModel } from '@chat/models';
import { HttpBaseService } from '@core/services/http-base.service';

@Injectable({
  providedIn: 'root',
})
export class AiModelsApi extends HttpBaseService {
  getAiModels() {
    return this.getP<AiModelModel[]>('/models');
  }
}
