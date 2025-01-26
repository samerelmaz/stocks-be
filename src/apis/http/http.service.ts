import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  constructor() {}

  async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, options);

    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error(`Fetch error: ${JSON.stringify(jsonResponse)}`);
    }

    return jsonResponse;
  }
}
