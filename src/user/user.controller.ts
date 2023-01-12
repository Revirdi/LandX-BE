import {
  Controller,
  Post,
  Res,
  Get,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
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
    let check = await this.userService.updateUser(body);
    if (!check) return res.status(409).json({ message: 'Gagal update user' });
    return res.status(200).json({ message: 'Berhasil update user' });
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res: Response): Promise<Response> {
    await this.userService.deleteUser(params.id);
    return res.status(200).json({ message: 'Berhasil delete user' });
  }
}
