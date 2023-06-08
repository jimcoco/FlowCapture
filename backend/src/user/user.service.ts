import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CommunityService } from 'src/community/community.service';
import { VoteService } from 'src/vote/vote.service';


@Injectable()
export class UserService {

  constructor(
    @InjectModel('user') private readonly model: Model<UserDocument>,
    @Inject(forwardRef(() => CommunityService)) private communityService: CommunityService,
    private readonly voteService: VoteService,
  ) { }

  async create(data: any) {
    return await new this.model({ ...data }).save();
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(address: string) {
    const user = await this.model.findOne({ address }).exec();
    if (user) {
      var community = [];
      const joined = user.joined;
      for (var i = 0; i < joined.length; i++) {
        const cms = await this.communityService.findOneById(joined[i])
        community.push(cms)
      }
      const vote = await this.voteService.findByAddress(user.address)
      return { user, community, vote }
    } else {
      return { user: "" }
    }
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async updateUserWithCommunity(address: string, c: string) {
    var user = await this.model.findOne({ address }).exec();
    var tmp = user.joined;
    if (!tmp.includes(c)) {
      tmp.push(c);
    }
    user.joined = tmp;
    var community = await this.communityService.findOneById(c);
    var tmps = community.space;
    if (!tmps.includes(address)) {
      tmps.push(address)
    }
    community.space = tmps;
    await this.communityService.update(c, community);
    return await this.model.findByIdAndUpdate(user._id, user, { new: true }).exec();
  }

  async findById(_id) {
    if (_id) {
      return await this.model.findById(_id).exec();
    } else {
      return null
    }
  }


}
