import { ModelListItemDeveloperResModel } from './model-list-item-developer-res.model';

export interface ModelListItemResModel {
  id: string;
  name: string;
  shortName: string;
  value: string;
  developer: ModelListItemDeveloperResModel;
}
