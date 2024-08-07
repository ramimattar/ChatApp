import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChatsPage } from './chats.page';

import { ChatsPageRoutingModule } from './chats-routing.module';

export interface Message {
  content: string;
  sender: string;
  timestamp: Date;
}

export interface Chat {
  _id: string;
  participants: { username: string }[];
  lastMessage?: Message;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsPageRoutingModule
  ],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
