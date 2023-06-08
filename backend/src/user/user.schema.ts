import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    avatar: string;

    // @Prop()
    // treeblock: {
    //     block:number,
    //     cnt:number,
    //     updatedAt: string
    // }[]; 
    
    @Prop()
    detail: string;

    @Prop()
    joined: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);

