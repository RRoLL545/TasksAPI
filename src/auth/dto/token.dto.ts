import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkxvTG9MIiwiaWQiOjQsImlhdCI6MTczMzg5ODIxNSwiZXhwIjoxNzMzOTg0NjE1fQ.JEQEMByPMSSpHf6C0jnubHphdxVaT9hw-FjpaagrqU4',
    description: 'Jwt токен',
  })
  token: string;
}