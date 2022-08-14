export interface IEmployeesRequest {
  id: string | number;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  email: string;
  phoneNumber: number;
  password: string;
  dateOfBirth: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeResponse {
  id: string | number;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  email: string;
  phoneNumber: number;
  password: string;
  dateOfBirth: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeesResponse {
  employees: Array<IEmployeeResponse>;
}

export interface IOrganizationsState {
  employees: IEmployeesResponse;
  employee: IEmployeeResponse;
}
