import { Injectable } from '@angular/core';
import { AiModelModel } from '@chat/models';
import { HttpService } from '@core/services/http-base.service';

@Injectable({
  providedIn: 'root',
})
export class AiModelsApi extends HttpService {
  getAiModels() {
    return this.getP<AiModelModel[]>('/models');
  }
}
