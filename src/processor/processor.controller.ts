import { Controller, Post, Body } from '@nestjs/common';
import { ProcessorService } from './processor.service';
import { CreateProcessorDto } from './dto/create-processor.dto';

@Controller('processor')
export class ProcessorController {
  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(@Body() createProcessorDto: CreateProcessorDto): Promise<void> {
    return this.processorService.create(createProcessorDto);
  }
}
