import { Body, Controller, Get, Post, Put, Query, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { use } from 'passport';
import { GetUser } from 'src/users/decorator/get-user.decorator';
import { USERROLES } from 'src/users/enum/User.enum';
import { User } from 'src/users/schema/User.schema';
import { JwtAuthGuard } from 'src/users/services/jwt.guard';
import { RolesGuard } from 'src/users/services/roles.guard';
import { QueueDto } from './queDTO/queue.dto';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
    constructor(
        private queService: QueueService,
         ){
    
    }


@Post('createQue')
async createCourse(
    @Body() queDto: QueueDto
): Promise <any>{
 return this.queService.enqueue(queDto.data, queDto.priority);
}

@Put('pop')
async popQue(    
): Promise <any>{
 return this.queService.pop();
}

@Get('pop')
async peek(    
): Promise <any>{
 return this.queService.peek();
}

@Get('isEmpty')
async isEmpty(    
): Promise <any>{
 return this.queService.isEmpty();
}


}
