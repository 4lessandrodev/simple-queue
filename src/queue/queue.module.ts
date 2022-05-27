import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue, QueueSchema } from './entities/queue.entity';
import { ProcessorModule } from 'src/processor/processor.module';

@Module({
  imports: [
    ProcessorModule,
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
