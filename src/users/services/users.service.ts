import { AdminSignUpDto, SignInDto, StudentSignUpDto } from '../dto/create-admin.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/User.schema';
import { Roles } from '../schema/Roles.schema';
import { Model } from 'mongoose';

import { USERROLES } from '../enum/User.enum';
import * as bcrypt from 'bcrypt';
import {
  PayLoad,
  UserRoleMapInterface,
  UserRolesInterface,
} from '../interfaces/user.interface';
import { UserRoleMap } from '../schema/UserRoleMap.schema';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Roles.name)
    private readonly roleModel: Model<Roles>,
    @InjectModel(UserRoleMap.name)
    private readonly userRoleMapModel: Model<UserRoleMap>,
    private jwtService: JwtService,
  ) {}

  async createAdminUser(adminDetails: AdminSignUpDto): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        userId: adminDetails.userId,
      });
      if (!user) {
        let salt = await bcrypt.genSalt();
        adminDetails.password = await bcrypt.hash(adminDetails.password, salt);

        let roleId = await this.getRoleId(USERROLES.ADMIN);
        let savedUserData = await this.userModel.create(adminDetails);

        let userRoleMapObj: UserRoleMapInterface = {
          userId: savedUserData.id,
          userRoleId: roleId,
        };

        let savedUserRoleMap = await this.userRoleMapModel.create(
          userRoleMapObj,
        );

        return 'Admin successfully created';
      } else {
        throw new UnauthorizedException('User Id Already exists');
      }
    } catch (error) {
      console.log(error.code);

      throw error;
    }
  }

  async createStudent(studentDetails: StudentSignUpDto): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        userId: studentDetails.userId,
      });
      if (!user) {
        let salt = await bcrypt.genSalt();
        studentDetails.password = await bcrypt.hash(studentDetails.password, salt);

        let roleId = await this.getRoleId(USERROLES.STUDENT);
        let savedUserData = await this.userModel.create(studentDetails);

        let userRoleMapObj: UserRoleMapInterface = {
          userId: savedUserData.id,
          userRoleId: roleId,
        };

        let savedUserRoleMap = await this.userRoleMapModel.create(
          userRoleMapObj,
        );

        return 'Student successfully created';
      } else {
        throw new UnauthorizedException('User Id Already exists');
      }
    } catch (error) {
      console.log(error.code);

      throw error;
    }
  }

  async getRoleId(roleName: string): Promise<string> {
    return await (
      await this.roleModel.findOne({ role: roleName })
    )._id;
  }

  async createUserRole(): Promise<string> {
    let role: UserRolesInterface[] = [
      {
        role: USERROLES.ADMIN,
      },
      {
        role: USERROLES.STUDENT,
      },
    ];
    let userRole = await this.roleModel.insertMany(role);

    //published

    if (userRole) {
      return 'User Roles created';
    } else {
      return 'Failed! Creating User Roles';
    }
  }

  async signIn(signInDetails: SignInDto): Promise<{ accessToken: string }> {
    try {
      const { userId, password } = signInDetails;
      const user = await this.userModel.findOne({ userId });

      if (user && (await bcrypt.compare(password, user.password))) {
        
        const payLoad: PayLoad = {
          id: user.id,
          userId,
          userName: user.name,
        };
        const accessToken = await this.jwtService.sign(payLoad);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your login credentials');
      }
    } catch (error) {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }


}
