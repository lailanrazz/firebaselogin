import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx'; // Hanya mengimpor Geolocation

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
  declarations: [MapAnalystPage],
  providers: [Geolocation] // Mendaftarkan Geolocation di providers
})
export class MapAnalystPageModule {}
