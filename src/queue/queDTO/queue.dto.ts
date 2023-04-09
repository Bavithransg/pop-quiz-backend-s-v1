import { IsNotEmpty } from 'class-validator';

export class QueueDto {
    
    @IsNotEmpty()
    data: string;

    @IsNotEmpty()
    priority: string;

}

