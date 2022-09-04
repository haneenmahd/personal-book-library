import { Book, BookPublishResponse } from "../types/Book";
import { HTTPResponse } from "../types/Http";

export default class WebService {
  static shared = new WebService();

  BASE_URL = "http://localhost:3001/api";

  async get<T>(path: string, body?: any): Promise<T> {
    const response = await (
      await fetch(`${this.BASE_URL}${path}`, {
        method: "GET",
        body: body,
      })
    ).json();

    return response;
  }

  async put<T>(path: string, body?: any): Promise<T> {
    const response = await (
      await fetch(`${this.BASE_URL}${path}`, {
        method: "PUT",
        body: body,
      })
    ).json();

    return response;
  }

  async post<T>(path: string, body?: any): Promise<T> {
    const response = await (
      await fetch(`${this.BASE_URL}${path}`, {
        method: "POST",
        body: body,
      })
    ).json();

    return response;
  }

  async delete<T>(path: string, body?: any): Promise<T> {
    const response = (
      await fetch(`${this.BASE_URL}${path}`, {
        method: "DELETE",
        body: body,
      })
    ).json();

    return response;
  }

  async publishBook(info: Book): Promise<BookPublishResponse> {
    return await this.post<BookPublishResponse>("/create", info);
  }

  async getBooks(): Promise<Book[]> {
    return await this.get<[Book]>("/getAll");
  }

  async deleteAllBooks(): Promise<HTTPResponse> {
    return await this.delete<HTTPResponse>("/deleteAll");
  }
}
