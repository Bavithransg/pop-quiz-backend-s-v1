import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from '@nestjs/mongoose';
import { User } from "../schema/User.schema";
import { Model } from "mongoose";
import { JwtValidatorResponse, PayLoad } from "../interfaces/user.interface";
import { UserRoleMap } from "../schema/UserRoleMap.schema";
import { Role } from "../schema/Roles.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(Role.name)
        private readonly roleModel: Model<Role>,
        @InjectModel(UserRoleMap.name)
        private readonly userRoleMapModel: Model<UserRoleMap>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'pop-quiz-secret',
          });
    }

    async validate(payLoad: PayLoad){
        const user: User =  await this.userModel.findById(payLoad.id);
        const userRoleMap: UserRoleMap = await this.userRoleMapModel.findOne({userId: payLoad.id});
        const role: Role = await this.roleModel.findById(userRoleMap.userRoleId);
        const userDetails:  JwtValidatorResponse = { user , userRoleId: userRoleMap.userRoleId, userRoleName: role.role };
        if(!user){
            throw new UnauthorizedException();
        }

        return userDetails;
    }
}