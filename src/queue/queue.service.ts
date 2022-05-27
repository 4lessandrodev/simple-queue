import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDispatcher } from '../processor/processor.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { Queue, QueueDocument } from './entities/queue.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name)
    private readonly conn: Model<QueueDocument>,

    @Inject('Dispatcher')
    private readonly dispatcher: IDispatcher,
  ) {
    this.conn.addListener('save', (data: any) =>
      this.subscribe({ eventData: data.eventData }),
    );
  }

  async create(createQueueDto: CreateQueueDto): Promise<void> {
    const queue = new this.conn(createQueueDto);
    await queue.save();
    console.log('Saved');
  }

  async subscribe(dto: CreateQueueDto): Promise<void> {
    console.log('Subscribed!');
    await this.dispatcher.create(dto);
  }
}
