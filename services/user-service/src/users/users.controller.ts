import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/')
  hello(): string {
    return 'Hello from Users Service!';
  }
}
