import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue/queue.module';
import { ProcessorModule } from './processor/processor.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    QueueModule,
    ProcessorModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
