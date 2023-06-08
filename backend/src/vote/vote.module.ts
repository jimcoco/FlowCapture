import { Module } from '@nestjs/common'; 
import { VoteService } from './vote.service'; 
import { VoteController } from './vote.controller';
import { VoteSchema } from './vote.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: 'vote', schema: VoteSchema}])],
  controllers: [VoteController],
  providers: [VoteService],
  exports: [VoteService]
})
export class VoteModule {}
