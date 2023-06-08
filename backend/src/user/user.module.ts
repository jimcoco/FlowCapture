import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema'; 
import { CommunityModule } from 'src/community/community.module';
import { VoteModule } from 'src/vote/vote.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    forwardRef(()=>CommunityModule),
    VoteModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
