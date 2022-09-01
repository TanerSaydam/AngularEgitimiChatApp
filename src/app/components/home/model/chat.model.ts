export class ChatModel{
    id: number;
    userId: number;
    toUserId: number;    
    date: string;
    message: string;
    isRead: boolean;
}