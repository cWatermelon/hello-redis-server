import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/demo')
  getHello(): any {
    return this.appService.getHello();
  }

  @Post('/api/v1/login')
  login(@Body() params: any): Observable<string> {
    return params;
  }
}
