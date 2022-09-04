import { HTTPResponse } from "./Http";

export interface Book {
  title: string;
  description: string;
  author: string;
  dueDate: Date;
}

export interface PrivateBookDate extends Book {
  id: string;
  doneDate: Date;
  finishedReading: boolean;
}

export interface BookPublishResponse extends HTTPResponse {
  id: string;
}
