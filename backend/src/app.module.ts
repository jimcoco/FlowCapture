import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';  
import { ENVS } from './env';  
import { CommunityModule } from './community/community.module';
import { UserModule } from './user/user.module';
import { ProposalModule } from './proposal/proposal.module';
import { VoteModule } from './vote/vote.module';
 
@Module({
  imports: [ 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(ENVS.MONGO_ROOT),    
    CommunityModule,
    ProposalModule,
    VoteModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,  
  ],
})
export class AppModule  {  }
