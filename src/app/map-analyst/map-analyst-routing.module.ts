import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapAnalystPage } from './map-analyst.page';

const routes: Routes = [
  {
    path: '',
    component: MapAnalystPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapAnalystPageRoutingModule {}
