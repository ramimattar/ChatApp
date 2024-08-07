import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { Chat } from './chats.module';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chats: Chat[] = [];

  constructor(private chatService: ChatService,private router: Router) { }

  ngOnInit() {
    this.chatService.getChats().subscribe((chats) => {
      this.chats = chats;
    });
  }

  openChat(id: string) {
    this.router.navigate(['/conversation', id]);
  } 
}
