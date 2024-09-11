export class GetProfile {
  static readonly type = '[Profile] Get Profile';
  constructor() {}
}

export class UpdateProfile {
  static readonly type = '[Profile] Update Profile';
  constructor(public payload: { username: string; website: string; avatar_url: string }) {}
}

export class GetEmail {
  static readonly type = '[Profile] Get Email';
  constructor() {}
}
