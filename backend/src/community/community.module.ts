import { Module, forwardRef } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { CommunitySchema } from './community.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalModule } from 'src/proposal/proposal.module';
import { UserModule } from 'src/user/user.module';
import { VoteModule } from 'src/vote/vote.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'community', schema: CommunitySchema }],),
    VoteModule,
    ProposalModule,
    forwardRef(() => UserModule)
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
  exports: [CommunityService]
})
export class CommunityModule { }
