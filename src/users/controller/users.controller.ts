import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorator/get-user.decorator';
import { Roles } from '../decorator/roles.decorator';
import { AdminSignUpDto, SignInDto } from "../dto/create-admin.dto";
import { USERROLES } from '../enum/User.enum';
import { JwtValidatorResponse, PayLoad } from '../interfaces/user.interface';
import { User } from '../schema/User.schema';
import { UsersService } from "../services/users.service";
@Controller('users')
export class UsersController {
constructor(
    private userService: UsersService,
     ){

}

@Post('createRoles')
async createRoles(
): Promise <string>{
 return this.userService.createUserRole();
}

@Post('admin/signUp')
@UsePipes(ValidationPipe)
async adminSignUp(
    @Body() adminDetails: AdminSignUpDto
): Promise <string>{
 return this.userService.createAdminUser(adminDetails);
}

@Post('signIn')
@UsePipes(ValidationPipe)
async signIn(
    @Body() loginDetails: SignInDto
): Promise <{accessToken: string}>{
return this.userService.signIn(loginDetails);
}

@Get('users')
@UseGuards(AuthGuard())
@Roles(USERROLES.STUDENT)
async getUsers(
    @GetUser() userDetails: JwtValidatorResponse
): Promise <string>{
    console.log(userDetails);
    
    return ""
}
}
