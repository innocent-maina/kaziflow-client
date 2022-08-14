export interface ITasksRequest {
  id: string | number;
  name: string;
  description: string;
  project: string;
  assignee: string | Array<string>;
  reporter: string;
  progress: string | number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskResponse {
  id: string | number;
  name: string;
  description: string;
  project: string;
  assignee: string | Array<string>;
  reporter: string;
  progress: string | number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITasksResponse {
  tasks: Array<ITaskResponse>;
}

export interface IOrganizationsState {
  tasks: ITasksResponse;
  task: ITaskResponse;
}
