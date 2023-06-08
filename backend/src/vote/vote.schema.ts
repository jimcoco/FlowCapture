import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
    
    @Prop()
    community: string;

    @Prop()
    proposal: string;

    @Prop()
    maker: string;

    @Prop()
    address: string;

    @Prop()
    avatar: string;

    @Prop()
    title: string;

    @Prop()
    token: string;

    @Prop()
    contract: string;

    @Prop()
    thresold: number;  
    
    @Prop()
    candidate: string;  
     
    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;  
    
}

export const VoteSchema = SchemaFactory.createForClass(Vote);

