import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersRepoService } from './users/repo/users-repo.service';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot("mongodb+srv://bavithranmahendran:6as03eNpSBweJQXw@cluster0.uiegijl.mongodb.net/test?retryWrites=true&w=majority"),
  ],
  providers: [UsersRepoService],  
})
export class AppModule {}
