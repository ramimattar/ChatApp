// src/app/pages/conversation/conversation.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  messages: any[] = [];
  newMessage = '';
  chatId: string = '';
  chat: any;
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private socket: Socket
  ) { }

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id')!;
    this.userName = 'User' + Math.floor(Math.random() * 1000);

    this.socket.on('message', (message: any) => {
      this.messages.push(message);
    });

    this.socket.on('userJoined', (data: any) => {
      this.messages.push(data.message);
    });
  
    this.socket.emit('joinGroup', { chatId: this.chatId, userName: this.userName });
  }

  sendMessage() {
    const message = {
      chatId: this.chatId,
      content: this.newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    this.messages.push(message);
    this.socket.emit('message', message);
    this.newMessage = '';

  }
}
