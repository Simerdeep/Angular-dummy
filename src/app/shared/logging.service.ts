import { Injectable } from '@angular/core';


export class LoggingService {

  lastLog: string;

  constructor() { }

  printLog(message: string) {
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
  }
}
