import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoursesDto } from '../dto/create-courses.dto';
import { CoursesService } from '../services/courses.service';

@Controller('courses')
export class CoursesController {
    constructor(
        private courseService: CoursesService,
         ){
    
    }

@Post('createCourse')
@UsePipes(ValidationPipe)
async createCourse(
    @Body() coueseDetails: CoursesDto
): Promise <string>{
 return this.courseService.createCourse(coueseDetails);
}

/* @Get('admin/getList')
@UsePipes(ValidationPipe)
async getListForAdmin(
): Promise <string>{
 return this.courseService.getListForAdmin();
} */



}
