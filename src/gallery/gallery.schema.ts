/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GalleryDocument = Gallery & Document;

@Schema()
export class Gallery {
  @Prop()
  imageUrl: string;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
