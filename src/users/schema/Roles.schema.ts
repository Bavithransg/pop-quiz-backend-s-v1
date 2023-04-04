import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Roles & Document;

@Schema({
  timestamps:true,
  autoIndex:true,
})
export class Roles extends Document {
  @Prop({ required: false,default:true })
  isActive:boolean;
  @Prop({require:true})
  role:string;
 
}

export const RoleSchema = SchemaFactory.createForClass(Roles);
