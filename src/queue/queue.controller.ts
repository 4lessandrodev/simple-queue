import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
  }
}
