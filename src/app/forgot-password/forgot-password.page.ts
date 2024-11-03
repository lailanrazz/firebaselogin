import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth'; // Import Auth dan fungsi

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email!: string;
  dropdownOpen= false;

  constructor(
    private auth: Auth, // Gunakan Auth dari Firebase
    private toastr: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async resetPassword() {
    if (this.email) {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'crescent',
        showBackdrop: true,
      });
      await loading.present(); // Pastikan menunggu presentasi loading

      try {
        // Menggunakan sendPasswordResetEmail dari Firebase
        await sendPasswordResetEmail(this.auth, this.email);
        loading.dismiss(); // Tutup loading
        this.toast('Please check your email', 'success');
        this.router.navigate(['/login']);
      } catch (error: any) {
        loading.dismiss();
        this.toast(error.message, 'danger');
      }
    } else {
      this.toast('Please enter your email address', 'danger');
    }
  }

  async toast(message: string, status: string) {
    const toast = await this.toastr.create({
      message: message,
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
