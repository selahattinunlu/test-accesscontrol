export interface User {
  id: number;
  name: string;
  email: string;
  companies: Company[];
}

export interface Company {
  id: number;
  name: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission;
}

export interface Permission {
  [key: string]: string[];
}
