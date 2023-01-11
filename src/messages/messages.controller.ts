import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}
  @Get()
  getAllMessages() {
    return this.messagesService.findAll();
  }
  @Get('/:id')
  async getOneMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message)
      throw new NotFoundException(`Message with id ${id} not found`);
    return message;
  }
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }
}
