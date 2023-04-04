import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from '@nestjs/mongoose';
import { User } from "../schema/User.schema";
import { Model } from "mongoose";
import { PayLoad } from "../interfaces/user.interface";
import { UserRoleMap } from "../schema/UserRoleMap.schema";
import { Roles } from "../schema/Roles.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(Roles.name)
        private readonly roleModel: Model<Roles>,
        @InjectModel(UserRoleMap.name)
        private readonly userRoleMapModel: Model<UserRoleMap>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'pop-quiz-secret',
          })
    }

    async validate(payLoad: PayLoad):Promise<User>{
        try{
        const user: User =  await this.userModel.findById(payLoad.id);      
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }catch(error){
        console.log(error);
        throw new UnauthorizedException();
        
    }
    }
}