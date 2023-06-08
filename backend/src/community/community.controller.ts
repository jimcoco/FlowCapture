import { Controller, Get, Param, Post, Body } from '@nestjs/common'; 
import { CommunityService } from './community.service'; 

 
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {} 

  @Post()
  createOne(@Body() data) {
    return this.communityService.create(data); 
  }
 
  @Get()
  findAll() {
    return this.communityService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityService.findById(id);
  } 
   
}
