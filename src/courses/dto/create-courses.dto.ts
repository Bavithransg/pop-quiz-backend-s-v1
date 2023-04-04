import { IsNotEmpty } from 'class-validator';

export class CoursesDto {
    
    @IsNotEmpty()
    courseName: string;

    @IsNotEmpty()
    capacity: string;

}

export class JoinCoursesDto {
    
    @IsNotEmpty()
    courseId: string;

}