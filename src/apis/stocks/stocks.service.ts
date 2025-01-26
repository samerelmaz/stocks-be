import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { STOCK_SYMBOLS } from './constants';
import { StockResponseDto, PortfolioResponseDto } from './dto/stock.dto';
import { PolygonService } from '../polygon/polygon.service';

@Injectable()
export class StocksService {
  constructor(
    private polygonService: PolygonService,
    private logger: LoggerService,
  ) {}

  async getPortfolio(): Promise<PortfolioResponseDto> {
    // This would typically come from a user's database
    // Using dummy data for demonstration
    return {
      totalValue: 12535.0,
      totalChange: 32.5,
      totalChangePercent: 0.48,
      buyingPower: 840.5,
    };
  }

  async getWatchlist(): Promise<StockResponseDto[]> {
    const stocks: StockResponseDto[] = [];

    for (const symbol of STOCK_SYMBOLS) {
      try {
        const aggregates = await this.polygonService.getStockAggregates(symbol);
        const details = await this.polygonService.getCompanyDetails(symbol);

        if (aggregates.results && aggregates.results.length > 0) {
          const currentPrice =
            aggregates.results[aggregates.results.length - 1].c;
          const openPrice = aggregates.results[0].o;
          const change = currentPrice - openPrice;
          const changePercent = (change / openPrice) * 100;

          stocks.push({
            symbol,
            name: details.results.name,
            price: currentPrice,
            change,
            changePercent,
          });
        } else {
          this.logger.warn(`No aggregate data available for ${symbol}`);
        }
      } catch (error) {
        this.logger.error(
          `Error fetching stock data for ${symbol}. ${error}`,
          'StocksService - getWatchlist',
        );
      }

      // Add a delay between requests to avoid rate limiting for free plan api key.
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return stocks;
  }
}
