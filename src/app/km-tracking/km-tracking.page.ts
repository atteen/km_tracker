import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-km-tracking',
  templateUrl: './km-tracking.page.html',
  styleUrls: ['./km-tracking.page.scss'],
})
export class KmTrackingPage implements OnInit {
  constructor(
    private readonly supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {}

  async signOut() {
    console.log('testing?');
    await this.supabase.signOut();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
