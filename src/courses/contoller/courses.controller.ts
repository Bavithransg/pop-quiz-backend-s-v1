import { Body, Controller, Get, Post, Put, Query, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { use } from 'passport';
import { GetUser } from 'src/users/decorator/get-user.decorator';
import { USERROLES } from 'src/users/enum/User.enum';
import { User } from 'src/users/schema/User.schema';
import { JwtAuthGuard } from 'src/users/services/jwt.guard';
import { RolesGuard } from 'src/users/services/roles.guard';
import { CoursesDto, JoinCoursesDto } from '../dto/create-courses.dto';
import { CoursesService } from '../services/courses.service';

@Controller('courses')
export class CoursesController {
    constructor(
        private courseService: CoursesService,
         ){
    
    }



@Post('createCourse')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata('role', [USERROLES.ADMIN])
async createCourse(
    @Body() coueseDetails: CoursesDto
): Promise <string>{
 return this.courseService.createCourse(coueseDetails);
}

@Post('joinCourse')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata('role', [USERROLES.STUDENT])
async joinCourse(
    @Query('courseId') courseId: string,
    @GetUser() user: User
): Promise <string>{
 return this.courseService.joinCourse(courseId, user);
}

@Put('dropCourse')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata('role', [USERROLES.STUDENT])
async Course(
    @Query('courseId') courseId: string,
    @GetUser() user: User
): Promise <string>{
 return this.courseService.dropCourse(courseId, user);
}

@Get('admin/getList')
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata('role', [USERROLES.ADMIN])
async getListForAdmin(
): Promise <any>{
 return this.courseService.getListForAdmin();
}

@Get('student/getList')
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata('role', [USERROLES.STUDENT])
async getListForStudent(
): Promise <any>{
 return this.courseService.getListForStudent();
}



}
