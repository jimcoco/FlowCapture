import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
    
    @Prop()
    owner: string;

    @Prop()
    maker: string;

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    team: string;

    @Prop()
    bio: string;

    @Prop()
    category: string;

    @Prop()
    slug: string;

    @Prop()
    avatar: string;

    @Prop()
    banner: string;

    @Prop()
    votecnt: string;

    @Prop()
    flow: string;

    @Prop()
    twitter: string;

    @Prop()
    discord: string;

    @Prop()
    github: string;

    @Prop()
    website: string;

    @Prop()
    ipfskey: string;

    @Prop()
    secret: string;

    @Prop()
    space: string[];

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;
    

    @Prop()
    contribute: {
        name:string, 
        updatedAt: string
    }[];   
}

export const CommunitySchema = SchemaFactory.createForClass(Community);

