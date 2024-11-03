import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email!: string;
  password!: string;
  dropdownOpen = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  register() {
    this.router.navigate(['/register']);
  }

  forgot() {
    this.router.navigate(['/forgot-password']);
  }
  async login() {
    if (this.email && this.password) {
      const loading = await this.loadingCtrl.create({
        message: 'Logging in...',
        spinner: 'crescent',
        showBackdrop: true,
      });

      await loading.present();

      this.auth.login(this.email, this.password).then(() => {
        loading.dismiss();
        // Paksa navigasi ke home
        this.router.navigate(['/maps2']);
      }).catch((error) => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
    } else {
      this.toast('Please enter your email and password!', 'danger');
    }
  }

  async toast(message: string, status: string) {
    const toast = await this.toastr.create({
      message,
      position: 'top',
      color: status,
      duration: 2000,
    });
    toast.present();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
