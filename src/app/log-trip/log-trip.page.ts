import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-log-trip',
  templateUrl: './log-trip.page.html',
  styleUrls: ['./log-trip.page.scss'],
})
export class LogTripPage implements OnInit {


  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    
  }

  
}
