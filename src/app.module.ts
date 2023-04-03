import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from "@nestjs/mongoose";
import { CoursesModule } from './courses/courses.module';
@Module({
  imports: [
    UsersModule,    
    MongooseModule.forRoot("mongodb+srv://bavithranmahendran:6as03eNpSBweJQXw@cluster0.uiegijl.mongodb.net/pop-quiz?retryWrites=true&w=majority"),
    CoursesModule,
  ],
  providers: [],  
})
export class AppModule {}
