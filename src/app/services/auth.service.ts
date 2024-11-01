import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$!: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {
    this.user$ = authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          // Ganti 'users' dengan 'user'
          const userDoc = doc(this.firestore, `user/${user.uid}`);
          return from(getDoc(userDoc)).pipe(
            map(userSnap => userSnap.exists() ? (userSnap.data() as User) : null)
          );
        } else {
          return of(null);
        }
      })
    );
  }

  async login(email: string, pass: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating...',
      spinner: 'crescent',
      showBackdrop: true
    });
    await loading.present();

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, pass);
      
      if (userCredential.user && userCredential.user.emailVerified) {
        await loading.dismiss();
        this.router.navigate(['/home']);
      } else {
        await loading.dismiss();
        this.toast('Please verify your email!', 'danger');
        this.logout();
      }
    } catch (error) {
      await loading.dismiss();
      this.toast('Login failed! Please check your credentials.', 'danger');
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
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
}
