/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PartnerDocument = Partner & Document;

@Schema()
export class Partner {
  @Prop()
  imageUrl: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
