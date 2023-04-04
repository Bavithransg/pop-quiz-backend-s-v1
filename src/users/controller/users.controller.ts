import { Body, Controller, Get, Post, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from '../decorator/get-user.decorator';
import { AdminSignUpDto, SignInDto, StudentSignUpDto } from "../dto/create-admin.dto";
import { USERROLES } from '../enum/User.enum';
import { User } from '../schema/User.schema';
import { JwtAuthGuard } from '../services/jwt.guard';
import { RolesGuard } from '../services/roles.guard';
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

@Post('student/signUp')
@UsePipes(ValidationPipe)
async studentSignUp(
    @Body() studentDetails: StudentSignUpDto
): Promise <string>{
 return this.userService.createStudent(studentDetails);
}

@Post('signIn')
@UsePipes(ValidationPipe)
async signIn(
    @Body() loginDetails: SignInDto
): Promise <{accessToken: string}>{
return this.userService.signIn(loginDetails);
}


}
