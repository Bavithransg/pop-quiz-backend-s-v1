import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps:true,
    autoIndex:true,
  })

  export class Course extends Document {
    @Prop({ required: false,default:true })
    status:boolean;
    @Prop({require:true})
    courseName:string;
    @Prop({ required: true })
    capacity:string;
    
  }

  export const CourseSchema = SchemaFactory.createForClass(Course);