import { DeveloperModel } from '../developer.model';
import { MetadataModel } from '../metadata.model';
import { PriceModel } from '../price.model';

export interface ModelResModel {
  id: string;
  name: string;
  shortName: string;
  value: string;
  link: string;
  guestAccess: boolean;
  price: PriceModel;
  metadata: MetadataModel;
  developer: DeveloperModel;
  createdAt: Date;
  updatedAt: Date;
}
