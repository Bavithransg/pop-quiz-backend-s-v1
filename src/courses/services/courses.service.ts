import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { Course } from '../schema/courses.schema';
import { CoursesDto } from '../dto/create-courses.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>,
        
      ) {}

      async createCourse(courseDetails: CoursesDto){
        try{
            let savedCourse = await this.courseModel.create(courseDetails);

        return 'Course created successfully ';
        }catch(error){
            throw error;
        }
      }


      async getListForAdmin(){
        try{
            let courses = await this.courseModel.aggregate()

            return courses

        }catch(error){
            throw error;
        }
      }

}
