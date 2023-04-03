import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({
  timestamps:true,
  autoIndex:true,
})
export class Role extends Document {
  @Prop({ required: false,default:true })
  isActive:boolean;
  @Prop({require:true})
  role:string;
 
}

export const RoleSchema = SchemaFactory.createForClass(Role);
