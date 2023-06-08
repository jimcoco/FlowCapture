import { Controller, Get, Param, Post, Body } from '@nestjs/common';  
import { ProposalService } from './proposal.service';

 
@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {} 

  @Post()
  createOne(@Body() data) {
    return this.proposalService.create(data); 
  }
 
  @Get()
  findAll() {
    return this.proposalService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proposalService.findById(id);
  } 
   
}
