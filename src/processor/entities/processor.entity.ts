import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcessorDocument = Processor & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class Processor {
  @Prop({ type: String, required: true })
  eventData: string;
}

export const ProcessorSchema = SchemaFactory.createForClass(Processor);
