import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatModel } from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getChatUserList(userId: number){
    let api = this.apiUrl + "chats/GetChatUserList/" + userId;
    return this._http.get<any>(api);
  }

  readChats(userId: number, toUserId){
    let api = this.apiUrl + "chats/ReadChats/" + userId + "/" + toUserId;
    return this._http.get<any>(api);
  }

  getChats(userId: number, toUserId){
    let api = this.apiUrl + "chats/GetChats/" + userId + "/" + toUserId;
    return this._http.get<any>(api);
  }

  add(model: ChatModel){
    let api = this.apiUrl + "chats/Add";
    return this._http.post<any>(api, model);
  }
}
