import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { GetProfile, UpdateProfile, GetEmail } from './profile.actions';

export interface ProfileStateModel {
  profile: {
    username: string;
    website: string;
    avatar_url: string;
  } | null;
  email: string | null;
  loading: boolean;
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null,
    email: null,
    loading: false,
  },
})
@Injectable()
export class ProfileState {
  constructor(private supabaseService: SupabaseService) {}

  @Selector()
  static getProfile(state: ProfileStateModel) {
    return state.profile;
  }

  @Selector()
  static getEmail(state: ProfileStateModel) {
    return state.email;
  }

  @Action(GetProfile)
  async getProfile(ctx: StateContext<ProfileStateModel>) {
    ctx.patchState({ loading: true });

    try {
      const { data: profile, error } = await this.supabaseService.profile;

      if (error) {
        throw new Error('Failed to fetch profile');
      }

      ctx.patchState({ profile, loading: false });
    } catch (error) {
      ctx.patchState({ loading: false });
      console.error(error);
    }
  }

  @Action(UpdateProfile)
  async updateProfile(
    ctx: StateContext<ProfileStateModel>,
    action: UpdateProfile
  ) {
    ctx.patchState({ loading: true });

    try {
      await this.supabaseService.updateProfile(action.payload);
      const { data: profile, error } = await this.supabaseService.profile;

      if (error) {
        throw new Error('Failed to update profile');
      }

      ctx.patchState({ profile, loading: false });
    } catch (error) {
      ctx.patchState({ loading: false });
      console.error(error);
    }
  }

  @Action(GetEmail)
  async getEmail(ctx: StateContext<ProfileStateModel>) {
    try {
      const user = await this.supabaseService.user;
      const email = user?.email || null;

      ctx.patchState({ email });
    } catch (error) {
      console.error('Failed to fetch email:', error);
    }
  }
}
