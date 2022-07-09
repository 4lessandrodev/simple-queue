import { Module } from '@nestjs/common';
import { ProcessorService } from './processor.service';
import { ProcessorController } from './processor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Processor, ProcessorSchema } from './entities/processor.entity';
import { Queue, QueueSchema } from '../queue/entities/queue.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Processor.name, schema: ProcessorSchema },
      { name: Queue.name, schema: QueueSchema },
    ]),
  ],
  controllers: [ProcessorController],
  providers: [
    ProcessorService,
    {
      provide: 'Dispatcher',
      useClass: ProcessorService,
    },
  ],
  exports: ['Dispatcher'],
})
export class ProcessorModule {}
