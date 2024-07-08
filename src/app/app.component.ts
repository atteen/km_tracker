import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private supabase: SupabaseService, private router: Router) {
    this.supabase.authChanges((_, session) => {
      console.log(session);
      if (session?.user) {
        this.checkProfileFilled();
        // this.router.navigate(['/account']);
        console.log(session?.user);
      }
    });
  }

  async checkProfileFilled() {
    try {
      const { data: profile, error, status } = await this.supabase.profile;
      if (error && status !== 406) {
        throw error;
      }
      if (profile) {
        if (profile.username === '') {
          this.router.navigate(['/account']);
        } else {
          this.router.navigate(['/km-tracking']);
        }
      }
    } catch (error: any) {
      alert(error.message);
    }
  }
}
