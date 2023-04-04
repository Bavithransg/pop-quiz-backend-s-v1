import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USERROLES } from '../enum/User.enum';
import { Roles } from '../schema/Roles.schema';
import { UserRoleMap } from '../schema/UserRoleMap.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectModel(UserRoleMap.name)
    private readonly userRoleMapModel: Model<UserRoleMap>,
    @InjectModel(Roles.name)
    private readonly roleModel: Model<Roles>,    
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<USERROLES[]>(
        'role',
        context.getHandler(),
      );
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const userRoleMap: UserRoleMap = await this.userRoleMapModel.findOne({
        userId: request.user.id,
      });
      const userRole: Roles = await this.roleModel.findById(
        userRoleMap.userRoleId,
      );
      return roles.some((role) => userRole.role?.includes(role))
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
