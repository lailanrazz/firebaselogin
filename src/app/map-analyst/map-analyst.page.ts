import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map-analyst',
  templateUrl: './map-analyst.page.html',
  styleUrls: ['./map-analyst.page.scss'],
})
export class MapAnalystPage implements OnInit {
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
  dropdownOpen= false;
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.getCurrentLocation(); // Mengambil lokasi saat komponen diinisialisasi
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;

      console.log('Current Latitude:', this.currentLatitude);
      console.log('Current Longitude:', this.currentLongitude);

      // Tambahkan marker pada lokasi saat ini jika menggunakan peta
      // L.marker([this.currentLatitude, this.currentLongitude])
      //   .addTo(this.map)
      //   .bindPopup('Your Current Location')
      //   .openPopup();

      // Lakukan apapun yang ingin Anda lakukan dengan koordinat pengguna di sini
    }).catch((error) => {
      console.error('Error getting location:', error);
    });
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
