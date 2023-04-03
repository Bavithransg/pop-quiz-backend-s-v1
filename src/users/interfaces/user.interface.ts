import { User } from "../schema/User.schema";

export interface UserRoleMapInterface {
  userId: string;
  userRoleId: string;
}

export interface UserRolesInterface {
  role: string;
}

export interface PayLoad {
  id: string;
  userId: string;
  userName: string;
}
export interface JwtValidatorResponse {
  user: User;
  userRoleId: string;
  userRoleName: string;
}
