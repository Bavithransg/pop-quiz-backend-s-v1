import { SetMetadata } from '@nestjs/common';
import { USERROLES } from '../enum/User.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: USERROLES[]) => SetMetadata(ROLES_KEY, roles);