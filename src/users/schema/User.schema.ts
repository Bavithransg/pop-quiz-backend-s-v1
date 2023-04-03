import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps:true,
    autoIndex:true,
  })

  export class User extends Document {
    @Prop({ required: false,default:true })
    isActive:boolean;
    @Prop({
    type: String,
    required: true,
    unique: true,
    })
    userId:string;
    @Prop({ required: true })
    name:string;
    @Prop({ required: true })
    password:string;
  }

  export const UserSchema = SchemaFactory.createForClass(User);
  