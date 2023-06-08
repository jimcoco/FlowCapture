import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { ProposalSchema } from './proposal.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteModule } from 'src/vote/vote.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'proposal', schema: ProposalSchema }]),
    VoteModule,
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
  exports: [ProposalService]
})
export class ProposalModule { }
