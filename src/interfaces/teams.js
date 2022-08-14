export interface ITeamsRequest {
  id: string | number;
  name: string;
  description: string;
  avatar: string;
  responsibilities: string | Array<string>;
  leader: string;
  members: string | Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamResponse {
  id: string | number;
  name: string;
  description: string;
  avatar: string;
  responsibilities: string | Array<string>;
  leader: string;
  members: string | Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamsResponse {
  teams: Array<ITeamResponse>;
}

export interface IOrganizationsState {
  teams: ITeamsResponse;
  team: ITeamResponse;
}
