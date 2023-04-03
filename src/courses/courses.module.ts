import { Module } from '@nestjs/common';
import { CoursesController } from './contoller/courses.controller';
import { CoursesService } from './services/courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
