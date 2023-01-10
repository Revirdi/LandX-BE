import { Controller, Post, Res, Get, Body, Put } from '@nestjs/common';
import { Response } from 'express';
import { bodyDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async addUser(
    @Body() body: bodyDTO,
    @Res() res: Response,
  ): Promise<Response> {
    return res.json(await this.userService.addUser(body));
  }
  @Get()
  async getAllUser(@Res() res: Response): Promise<Response> {
    return res.json(await this.userService.getAllUser());
  }
  @Put()
  async updateUser(
    @Body() body: bodyDTO,
    @Res() res: Response,
  ): Promise<Response> {
    return res.json(await this.userService.updateUser(body));
  }
}
