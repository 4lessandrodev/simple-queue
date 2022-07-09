import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Queue, QueueDocument } from '../queue/entities/queue.entity';
import { CreateProcessorDto as Dto } from './dto/create-processor.dto';
import { Processor, ProcessorDocument } from './entities/processor.entity';

export interface IDispatcher {
  create(createProcessorDto: Dto): Promise<void>;
}

@Injectable()
export class ProcessorService {
  constructor(
    @InjectModel(Processor.name)
    private readonly conn: Model<ProcessorDocument>,

    @InjectModel(Queue.name)
    private readonly queues: Model<QueueDocument>,

    private readonly httpService: HttpService,
  ) {
    this.conn.addListener(
      'save',
      async (data: any): Promise<void> =>
        await this.deleteFromQueue({ eventData: data.eventData }),
    );
  }

  async create(createProcessorDto: Dto): Promise<void> {
    console.log('Processing... ', createProcessorDto);
    const processor = new this.conn(createProcessorDto);
    await processor.save();

    // call webhook here after process
    await this.notify(createProcessorDto);
  }

  async deleteFromQueue(dto: Dto): Promise<void> {
    await this.queues.deleteOne(dto);
    console.log('Deleted');
  }

  async notify(data: Dto): Promise<void> {
    const isFailure = Math.trunc(Math.random() * 100) % 2 === 0;
    if (!data.postBack) return;
    const result = this.httpService.post(data.postBack, {
      data,
      status: isFailure ? 'FAILURE' : 'SUCCESS',
    });
    const payload = await lastValueFrom(result);
    console.log(payload.status);
  }
}
