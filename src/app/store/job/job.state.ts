import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { GetJobs } from './job.actions';
import { Job } from '../../models';

export interface JobStateModel {
  jobs: Job[];
  loading: boolean;
}

@State<JobStateModel>({
  name: 'jobs',
  defaults: {
    jobs: [],
    loading: false,
  },
})
@Injectable()
export class JobState {
  constructor(private supabaseService: SupabaseService) {}

  @Selector()
  static getJobs(state: JobStateModel) {
    return state.jobs;
  }

  @Action(GetJobs)
  async getJobs(ctx: StateContext<JobStateModel>) {
    ctx.patchState({ loading: true });
    const jobs = await this.supabaseService.getJobs();
    ctx.patchState({ jobs, loading: false });
  }
}
