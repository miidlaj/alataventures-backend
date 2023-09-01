/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class Portfolio {

  @Prop()
  title: string;
  @Prop()
  company: string;
  @Prop()
  location: string;
  @Prop()
  status: string;
  @Prop()
  imageUrl: string;
}
export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
