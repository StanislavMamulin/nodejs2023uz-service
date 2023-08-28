import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetByIdParams {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
