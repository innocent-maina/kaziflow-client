export interface IProjectsRequest {
  id: string | number;
  name: string;
  description: string;
  leader: string;
  avatar: string;
  category: string;
  team: string;
  progress: number | string;
  status: string;
  endDate: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectResponse {
  id: string | number;
  name: string;
  description: string;
  leader: string;
  avatar: string;
  category: string;
  team: string;
  progress: number | string;
  status: string;
  endDate: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectsResponse {
  projects: Array<IProjectResponse>;
}

export interface IOrganizationsState {
  projects: IProjectsResponse;
  project: IProjectResponse;
}
