import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactService {
  getHello(): string {
    return "Hello World!";
  }
}
