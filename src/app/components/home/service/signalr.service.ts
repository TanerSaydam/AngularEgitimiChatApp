import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _connection: HubConnection

  get connection(): HubConnection {
    return this._connection;
  }


  start(hubUrl: string) {

    if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
        .withAutomaticReconnect()
        .build();

      console.log(hubUrl);
      hubConnection.start()
        .then(() => {
          console.log("Connected");
        })
        .catch(err => setTimeout(() => this.start(hubUrl), 2000));

      this._connection = hubConnection;
    }

    this._connection.onreconnected(connectionId => console.log("Reconnected"));
    this._connection.onreconnecting(err => console.log("Reconnecting"));
    this._connection.onclose(err => console.log("Close reconnection"));
  }

  invoke(procedureName: string, message: any, successCallBack?: (value: any) => void, errorCallBack?: (error: any) => void) {
    this.connection.invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack)
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack)
  }
}
