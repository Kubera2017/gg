import { Component, OnDestroy, Renderer2 } from '@angular/core';

import { Doctor } from '../models/Doctor';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnDestroy {

  doc: Doctor;
  connection = false;

  stopListening: Function;

  constructor(private renderer: Renderer2) {
    this.stopListening =
      renderer.listen('window', 'message', this.handleMessage.bind(this));
  }

  handleMessage(event: any) {
    console.log(event);

    if (!this.connection) {
      window.opener.postMessage('opened', window.location.href);
      this.connection = true;
    } else {
      this.doc = event.data;
      console.log(this.doc);
    }
  }

  onPrint() {
    window.print();
  }

  ngOnDestroy() {
    this.stopListening();
  }

}
