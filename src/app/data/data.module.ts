import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataPageRoutingModule } from './data-routing.module';
import { DataPage } from './data.page';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataPageRoutingModule,
    HighchartsChartModule
  ],
  declarations: [DataPage]
})
export class DataPageModule {}
