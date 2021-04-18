import { Component, OnInit } from '@angular/core';
import { GlobalServices } from 'src/app/shared/global.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private globalServices: GlobalServices) { }

  messages: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.globalServices.getMessages().subscribe((res: any) => {
      this.loading = false;
      this.messages = res.messages;
    });
  }

  delete(id: number) {
    this.globalServices.deleteMessage(id).subscribe((res: any) => {
      if(res.deleted) {
        this.messages.splice(this.messages.findIndex(mess => mess.id == id), 1);
      }
    });
  }

}
