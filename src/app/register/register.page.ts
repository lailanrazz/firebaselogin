import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  passwordMatch!: boolean;
  dropdownOpen = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async register() {
    if (this.name && this.email && this.password) {
      const loading = await this.loadingCtrl.create({
        message: 'loading..',
        spinner: 'crescent',
        showBackdrop: true,
      });

      await loading.present();

      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(async (userCredential) => {
          // Referensi dokumen baru di koleksi 'user'
          const userRef = doc(collection(this.firestore, 'user'), userCredential.user.uid);

          await setDoc(userRef, {
            userId: userCredential.user.uid,
            name: this.name,
            email: this.email,
            createdAt: Date.now(),
          });

          // Kirim verifikasi email
          await sendEmailVerification(userCredential.user);
        })
        .then(() => {
          loading.dismiss();
          this.toast('Registration Success! Please check your email for verification.', 'success');
          this.router.navigate(['/login']);
        })
        .catch((error: any) => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        });
    } else {
      this.toast('Please fill the form!', 'danger');
    }
  }

  checkPassword() {
    this.passwordMatch = this.password === this.confirmPassword;
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
