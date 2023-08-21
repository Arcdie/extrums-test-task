import { IsNotEmpty, IsString } from 'class-validator';

import { AbstractDto } from './abstract.dto';

export class LoginUserDto extends AbstractDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
