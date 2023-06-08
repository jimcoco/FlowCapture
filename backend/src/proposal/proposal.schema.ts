import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProposalDocument = Proposal & Document;

@Schema()
export class Proposal {
    
    @Prop()
    community: string;

    @Prop()
    maker: string;

    @Prop()
    address: string;

    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    summary: string;

    @Prop()
    system: number;

    @Prop()
    strategy: number;

    @Prop()
    token: string;

    @Prop()
    contract: string;

    @Prop()
    thresold: number;

    @Prop()
    percent: number;

    @Prop()
    supply: number;

    @Prop()
    sDate: string;

    @Prop()
    sTime: string;

    @Prop()
    eDate: string;

    @Prop()
    eTime: string;

    @Prop()
    zone: string;

    @Prop()
    shield: boolean;  

    @Prop()
    candidate: string[];

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;  
    
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);

