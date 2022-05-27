import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queue, QueueDocument } from 'src/queue/entities/queue.entity';
import { CreateProcessorDto } from './dto/create-processor.dto';
import { Processor, ProcessorDocument } from './entities/processor.entity';

export interface IDispatcher {
  create(createProcessorDto: CreateProcessorDto): Promise<void>;
}

@Injectable()
export class ProcessorService {
  constructor(
    @InjectModel(Processor.name)
    private readonly conn: Model<ProcessorDocument>,

    @InjectModel(Queue.name)
    private readonly queues: Model<QueueDocument>,
  ) {
    this.conn.addListener(
      'save',
      async (data: any): Promise<void> =>
        await this.deleteFromQueue({ eventData: data.eventData }),
    );
  }

  async create(createProcessorDto: CreateProcessorDto): Promise<void> {
    console.log('Processing... ', createProcessorDto);
    const processor = new this.conn(createProcessorDto);
    await processor.save();
    console.log('Processed!');
  }

  async deleteFromQueue(dto: CreateProcessorDto): Promise<void> {
    await this.queues.deleteOne(dto);
    console.log('Deleted');
  }
}
