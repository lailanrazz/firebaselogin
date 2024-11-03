import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  selectedRegion: string = 'DIY';
  selectedDetail: string = 'TOP-DOWN';
  dropdownOpen = false;

  // Year labels
  years = ['2018', '2019', '2020', '2021', '2022'];

  // Data for each sector in Gg for the table and chart
  data = [
    { item: 'Perkantoran & Pemukiman', values: [583.78, 802.77, 447.60, 447.54, 0] },
    { item: 'Transportasi', values: [1860.81, 1392.11, 2272.20, 1544.59, 2017.08] },
  ];

  constructor() {}

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        backgroundColor: '#e0f2f1' // Warna hijau muda sebagai latar belakang
      },
      title: {
        text: 'Emisi Sektor Energi DI Yogyakarta (2018-2022)',
        align: 'center',
        style: { color: '#2e7d32', fontSize: '16px' } // Warna hijau tua untuk judul
      },
      subtitle: {
        text: 'Emisi CO₂ dalam Gg untuk sektor Transportasi dan Perkantoran & Pemukiman',
        align: 'center',
        style: { color: '#388e3c', fontSize: '14px' } // Hijau sedang untuk subjudul
      },
      xAxis: {
        categories: this.years,
        title: {
          text: 'Tahun'
        },
        labels: {
          style: {
            color: '#2e7d32'
          }
        }
      },
      yAxis: {
        title: {
          text: 'Emisi (Gg)',
          style: { color: '#2e7d32' }
        },
        min: 0,
        labels: {
          style: {
            color: '#2e7d32'
          }
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' Gg'
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            color: '#2e7d32',
            style: {
              textOutline: 'none',
              fontSize: '12px'
            }
          }
        }
      },
      series: [
        {
          name: 'Transportasi',
          type: 'bar',
          data: this.data[1].values,
          color: '#43a047' // Hijau untuk Transportasi
        },
        {
          name: 'Perkantoran & Pemukiman',
          type: 'bar',
          data: this.data[0].values,
          color: '#81c784' // Hijau muda untuk Perkantoran & Pemukiman
        }
      ],
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
          color: '#2e7d32'
        }
      },
      credits: {
        enabled: false
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 600
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
  }

  updateChart() {
    // Additional logic if needed for dynamic region/detail updates
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
