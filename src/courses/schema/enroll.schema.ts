import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps:true,
    autoIndex:true,
  })

  export class Enroll extends Document {
    @Prop({ required: false,default:true })
    isActive:boolean;
    @Prop({require:true})
    courseId:string;
    @Prop({ required: true })
    studentId:string;
    
  }

  export const EnrollSchema = SchemaFactory.createForClass(Enroll);