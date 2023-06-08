import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common'; 
import { UserService } from './user.service'; 
 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data) {
     return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }
  
  @Get('/address/:address')
  findByAddress(@Param('address') address: string) {
    return this.userService.findOne(address);
  }

  @Post('/community')
  addCommunity(@Body() data){
    return this.userService.updateUserWithCommunity(data.address, data.community);
  }

  @Patch()
  findData(@Body() data){
    const id = data.id;
    const d = data.user;
    return this.userService.update(id, d);
  }
   
}
