import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { Course } from '../schema/courses.schema';
import { CoursesDto } from '../dto/create-courses.dto';
import { User } from 'src/users/schema/User.schema';
import { Enroll } from '../schema/enroll.schema';
import { use } from 'passport';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,
    @InjectModel(Enroll.name)
    private readonly enrollModel: Model<Enroll>,
  ) {}

  async createCourse(courseDetails: CoursesDto) {
    try {
      let savedCourse = await this.courseModel.create(courseDetails);

      return 'Course created successfully ';
    } catch (error) {
      throw error;
    }
  }

  async joinCourse(courseId: string, user: User) {
    try {
      let enroll = await this.checkAvailability(courseId, user);

      if (enroll) {
        let details: any = {
          courseId,
          studentId: user.id,
          isActive: true,
        };
        const savedEnroll = await this.enrollModel.create(details);
      }

      return 'Course created successfully ';
    } catch (error) {
      throw error;
    }
  }

  async checkAvailability(courseId: string, user: User): Promise<boolean> {
    const course: Course = await this.courseModel.findById(courseId);
    const enrollment: Enroll[] = await this.enrollModel.find({
      isActive: true,
      courseId,
    });

    if (course.capacity > enrollment.length) {
      if (enrollment.some((data) => user.id?.includes(data.studentId))) {
        throw new ConflictException('User Already registered with this course');
      } else {
        return true;
      }
    } else {
      throw new ConflictException('No seats available');
    }
  }

  async dropCourse(courseId: string, user: User){
    try{
    const enrollment: Enroll = await this.enrollModel.findOneAndUpdate({courseId, studentId: user.id, isActive: true},{isActive: false});
    return "Dropped from this course";
  }catch(error){
    throw new ConflictException(error);
  }

  }

  async getListForAdmin() {
    try {
      let courses = await this.courseModel.aggregate(
        [
          {
            '$lookup': {
              'from': 'enrolls', 
              'let': {
                'courseId': {
                  '$toString': '$_id'
                }
              }, 
              'pipeline': [
                {
                  '$match': {
                    '$and': [
                      {
                        '$expr': {
                          '$eq': [
                            '$courseId', '$$courseId'
                          ]
                        }
                      }, {
                        '$expr': {
                          '$eq': [
                            '$isActive', true
                          ]
                        }
                      }
                    ]
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'let': {
                      'userId': {
                        '$toObjectId': '$studentId'
                      }
                    }, 
                    'pipeline': [
                      {
                        '$match': {
                          '$expr': {
                            '$eq': [
                              '$_id', '$$userId'
                            ]
                          }
                        }
                      }, {
                        '$project': {
                          '_id': 0, 
                          'userId': 1, 
                          'name': 1
                        }
                      }
                    ], 
                    'as': 'studentDetails'
                  }
                }, {
                  '$unwind': {
                    'path': '$studentDetails', 
                    'preserveNullAndEmptyArrays': true
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'studentDetails': 1
                  }
                }
              ], 
              'as': 'activeEnrollments'
            }
          }, {
            '$lookup': {
              'from': 'enrolls', 
              'let': {
                'courseId': {
                  '$toString': '$_id'
                }
              }, 
              'pipeline': [
                {
                  '$match': {
                    '$and': [
                      {
                        '$expr': {
                          '$eq': [
                            '$courseId', '$$courseId'
                          ]
                        }
                      }, {
                        '$expr': {
                          '$eq': [
                            '$isActive', false
                          ]
                        }
                      }
                    ]
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'let': {
                      'userId': {
                        '$toObjectId': '$studentId'
                      }
                    }, 
                    'pipeline': [
                      {
                        '$match': {
                          '$expr': {
                            '$eq': [
                              '$_id', '$$userId'
                            ]
                          }
                        }
                      }, {
                        '$project': {
                          '_id': 0, 
                          'userId': 1, 
                          'name': 1
                        }
                      }
                    ], 
                    'as': 'studentDetails'
                  }
                }, {
                  '$unwind': {
                    'path': '$studentDetails', 
                    'preserveNullAndEmptyArrays': true
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'studentDetails': 1
                  }
                }
              ], 
              'as': 'droppedEnrollments'
            }
          }, {
            '$addFields': {
              'activeEnrollmentCount': {
                '$size': '$activeEnrollments'
              }, 
              'droppedEnrollmentCount': {
                '$size': '$droppedEnrollments'
              }
            }
          }, {
            '$project': {
              '_id': 0, 
              'courseName': 1, 
              'capacity': 1, 
              'activeEnrollments': 1, 
              'droppedEnrollments': 1, 
              'activeEnrollmentCount': 1, 
              'droppedEnrollmentCount': 1
            }
          }
        ]
      );

      return courses;
    } catch (error) {
      throw error;
    }
  }

  async getListForStudent() {
    try {
      let courses = await this.courseModel.find({status: true});

      return courses;
    } catch (error) {
      throw error;
    }
  }
}
