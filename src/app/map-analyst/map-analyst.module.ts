import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapAnalystPageRoutingModule } from './map-analyst-routing.module';

import { MapAnalystPage } from './map-analyst.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapAnalystPageRoutingModule
  ],
  declarations: [MapAnalystPage]
})
export class MapAnalystPageModule {}
