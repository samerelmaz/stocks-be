import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../http/http.service';
import { endpoints } from './endpoints';
import { CompanyDetails } from './interfaces/company-details.interface';
import { StockAggregates } from './interfaces/stock-aggregates.interface';
import * as dayjs from 'dayjs';

@Injectable()
export class PolygonService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('polygon.apiKey');
    this.baseUrl = this.configService.get<string>('polygon.baseUrl');
  }

  private async fetchFromApi<T>(endpoint: string) {
    return await this.httpService.fetch<T>(`${this.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async getStockAggregates(symbol: string) {
    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

    const endpoint = endpoints.getStockAggregates(symbol, yesterday, today);
    return this.fetchFromApi<StockAggregates>(endpoint);
  }

  async getCompanyDetails(symbol: string) {
    const endpoint = endpoints.getCompanyDetails(symbol);
    return this.fetchFromApi<CompanyDetails>(endpoint);
  }
}
