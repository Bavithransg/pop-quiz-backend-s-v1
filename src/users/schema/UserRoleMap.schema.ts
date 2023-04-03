import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRoleMapDocument = UserRoleMap & Document;

@Schema({
  timestamps:true,
  autoIndex:true,
})
export class UserRoleMap extends Document {
  @Prop({ required: false,default:true })
  isActive:boolean;
  @Prop({require:true})
  userId:string;
  @Prop({ required: true })
  userRoleId:string;
 
}

export const UserRoleMapSchema = SchemaFactory.createForClass(UserRoleMap);
