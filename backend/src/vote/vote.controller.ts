import { Controller, Get, Param, Post, Body } from '@nestjs/common';  
import { VoteService } from './vote.service';

 
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {} 

  @Post()
  createOne(@Body() data) {
    return this.voteService.create(data); 
  }
 
  @Get()
  findAll() {
    return this.voteService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voteService.findById(id);
  } 
   
}
