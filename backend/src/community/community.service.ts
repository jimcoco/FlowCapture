import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityDocument } from './community.schema';
import { ProposalService } from 'src/proposal/proposal.service';
import { UserService } from 'src/user/user.service';
import { VoteService } from 'src/vote/vote.service';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel('community') private readonly model: Model<CommunityDocument>,
    private proposalService: ProposalService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private voteService: VoteService
  ) { }

  async create(data: any) {
    const owner = data.owner;
    const community = await new this.model({ ...data }).save();
    const id = community._id;
    await this.userService.updateUserWithCommunity(owner, id);
    return community;
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne() {
    return await this.model.find().sort({ _id: -1 }).limit(1).exec();
  }

  async update(_id, data) {
    return await this.model.findByIdAndUpdate(_id, data, { new: true }).exec();
  }

  async findOneById(_id) {
    return await this.model.findById(_id).exec();
  }

  async findById(_id) {
    if (_id != undefined && _id) {
      const community = await this.model.findById(_id).exec();
      const proposal = await this.proposalService.findByCommunity(_id)
      const voters = await this.voteService.findByCommunity(community._id)
      return { community: community, proposals: proposal, voters: voters }
    } else {
      return { community: {}, proposals: [], voters: [] }
    }

  }

}
