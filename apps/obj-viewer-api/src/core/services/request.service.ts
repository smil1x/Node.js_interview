import { Injectable } from '@nestjs/common';
import { ConcurrencyManager } from 'axios-concurrency';
import axios from 'axios';

@Injectable()
export class RequestService {
  private readonly api = axios.create({});

  constructor() {
    ConcurrencyManager(this.api, 20);
  }

  async executeRequest(requestConfig) {
    return this.api(requestConfig);
  }
}
