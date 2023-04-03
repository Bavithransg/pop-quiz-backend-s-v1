import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schema/Roles.schema';
import { User, UserSchema } from './schema/User.schema';
import { UserRoleMap, UserRoleMapSchema } from './schema/UserRoleMap.schema';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RolesGuard } from './services/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: UserRoleMap.name, schema: UserRoleMapSchema },
    ]),

    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: "pop-quiz-secret",
      signOptions: {
        expiresIn: 3600,
      }
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy, 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule {}
