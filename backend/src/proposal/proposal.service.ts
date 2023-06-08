import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProposalDocument } from './proposal.schema';
import { VoteService } from 'src/vote/vote.service';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel('proposal') private readonly model: Model<ProposalDocument>,
    private readonly voteService: VoteService
  ) { }

  async create(data: any) {
    return await new this.model({ ...data }).save();
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne() {
    return await this.model.find().sort({ _id: -1 }).limit(1).exec();
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async findById(_id) {
    const proposal = await this.model.findById(_id).exec();
    const vote = await this.voteService.findByProposal(proposal._id)
    return { proposal, vote }
  }

  async findByCommunity(c: string) {
    return await this.model.find({ community: c }).exec();
  }

}
