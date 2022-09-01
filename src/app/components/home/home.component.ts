import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatUserModel } from './model/chat-user.model';
import { ChatModel } from './model/chat.model';
import { ChatService } from './service/chat.service';
import { DecodeService } from './service/decode.service';
import { SignalrService } from './service/signalr.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
]
})
export class HomeComponent implements OnInit, AfterContentChecked {

  userId: number = 0;
  toUserId: number = 0;
  chatUsers: ChatUserModel[] = [];
  chats: ChatModel[] = [];
  message: string = "";
  toUserName: string = "";
  toUserAvatar: string = "";
  filterText: string = "";
  fileUrl: string = environment.fileUrl;


  constructor(
    private _decode: DecodeService,
    private _chat: ChatService,
    private _signalR: SignalrService,
    private _cdref: ChangeDetectorRef
  ) {
    this.getUserId();
    this._signalR.start("https://localhost:7146/chat-hub")
   }
  ngAfterContentChecked(): void {
    //this.sampleViewModel.DataContext = this.DataContext;
    //this.sampleViewModel.Position = this.Position;
    this._cdref.detectChanges();
  }

  ngOnInit(): void {
    this.getChatUserList();
    this._signalR.on("messageMethod", message => {      
      this.metot();
    })
  }

  getUserId(){
    this.userId = this._decode.getUserId();
  }

  getChatUserList(){    
    this._chat.getChatUserList(this.userId).subscribe((res)=>{
      this.chatUsers = res.data;
    })
  }

  metot(){
    this._chat.getChats(this.userId, this.toUserId).subscribe((res)=>{
      this.chats = res.data;
      this.getChats();
      if (this.toUserId > 0) {
        this.toUserName = this.chatUsers.filter(p=> p.userId == this.toUserId)[0].userName;
        this.toUserAvatar = this.chatUsers.filter(p=> p.userId == this.toUserId)[0].avatar;
      }
      this.getChatUserList();      
    })
  }
  

  readChats(){    
    this._chat.readChats(this.userId, this.toUserId).subscribe((res)=>{
      this.chats = res.data;      
    })
  }

  getChats(){    
    this._chat.getChats(this.userId, this.toUserId).subscribe((res)=>{
      this.chats = res.data;    
      if (this.toUserId > 0) {
        this.toUserName = this.chatUsers.filter(p=> p.userId == this.toUserId)[0].userName;
        this.toUserAvatar = this.chatUsers.filter(p=> p.userId == this.toUserId)[0].avatar;   
      }
    })
  }

  getUserChats(id: number){    
    this.toUserId = id;
    this.readChats();
  }

  sendMessage(){
    let model = new ChatModel();
    model.userId = this.userId;
    model.toUserId = this.toUserId;
    model.message = this.message;
    model.isRead = false;

    this._chat.add(model).subscribe((res)=>{
      this.message = "";
    })
  }

}
