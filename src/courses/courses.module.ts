import { Module } from '@nestjs/common';
import { CoursesController } from './contoller/courses.controller';
import { CoursesService } from './services/courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/courses.schema';
import { JwtAuthGuard } from 'src/users/services/jwt.guard';
import { RolesGuard } from 'src/users/services/roles.guard';
import { Roles, RoleSchema } from 'src/users/schema/Roles.schema';
import { User, UserSchema } from 'src/users/schema/User.schema';
import { UserRoleMap, UserRoleMapSchema } from 'src/users/schema/UserRoleMap.schema';
import { Enroll, EnrollSchema } from './schema/enroll.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Roles.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: UserRoleMap.name, schema: UserRoleMapSchema },
      { name: Enroll.name, schema: EnrollSchema },


    ]),
    
  ],
  controllers: [CoursesController],
  providers: [CoursesService,RolesGuard,
    JwtAuthGuard]
})
export class CoursesModule {}
