import { Routes } from '@angular/router';
import { ModelsHomePage } from './pages/models-home-page/models-home-page';
import { ModelFormPage } from './pages/model-form-page/model-form-page';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: ModelsHomePage,
    title: 'Models',
  },
  {
    path: 'new',
    component: ModelFormPage,
    title: 'New Model',
  },
  {
    path: ':id',
    component: ModelFormPage,
    title: 'Edit Model',
  },
];
