import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QueueDocument = Queue & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class Queue {
  @Prop({ type: String, required: true })
  eventData: string;

  @Prop({ type: String, required: false, default: null })
  postBack?: string;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
