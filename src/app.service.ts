import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  check(): string {
    return 'API is working!!!';
  }
}
