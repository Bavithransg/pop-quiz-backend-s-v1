import { IsNotEmpty } from 'class-validator';

export class AdminSignUpDto {
    
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password:string;


}

export class StudentSignUpDto {
    
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password:string;


}

export class SignInDto {
    
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    password:string;


}

