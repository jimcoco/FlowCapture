import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoteDocument } from './vote.schema';

@Injectable()
export class VoteService {
  constructor(@InjectModel('vote') private readonly model: Model<VoteDocument>) { }

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
    return await this.model.findById(_id).exec();
  }

  async findByProposal(c: string) {
    return await this.model.find({ proposal: c }).exec();
  }

  async findByAddress(c: string) {
    return await this.model.find({ address: c }).exec();
  }

  async findByCommunity(c: string) {
    return await this.model.find({ community: c }).exec();
  }

}
