import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupDTO {
  @ApiProperty({ example: 'Oyin' })
  @IsString()
  readonly first_name: string;

  @ApiProperty({ example: 'Vamp' })
  @IsString()
  readonly last_name: string;

  @ApiProperty({ example: 'Vamp@123' })
  @IsStrongPassword()
  readonly password: string;

  @ApiProperty({ example: 'vamp@gmail.com' })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase()) // Convert to lowercase
  readonly email: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  readonly country_of_residence: string;

  readonly industry: string;
  @IsString()
  @ApiProperty({ example: 'Administration' })
  @ApiProperty({ example: 'Lawyer' })
  @IsString()
  readonly occupation: string;
}

export class LoginDTO {
  @ApiProperty({
    description: 'user unique email',
    example: 'vamp@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase()) // Convert to lowercase
  readonly email: string;

  @ApiProperty({ example: 'Vamp@123' })
  @IsString()
  readonly password: string;
}

export class otpDTO {
  @ApiProperty({ example: 'vamp@gmail.com' })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ example: '8790' })
  @IsString()
  readonly otp: string;
}

export class resendOTP {
  @ApiProperty({ example: 'vamp@gmail.com' })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ example: '2345' })
  @IsString()
  @IsOptional()
  readonly otp: string;
}

export class EmailDTO {
  @ApiPropertyOptional({ example: 'vamp@gmail.com' })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;
}
