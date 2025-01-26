import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StocksService } from './stocks.service';
import { PortfolioResponseDto, StockResponseDto } from './dto/stock.dto';

@ApiTags('stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('portfolio')
  @ApiOperation({ summary: 'Get portfolio data' })
  @ApiResponse({
    status: 200,
    description: 'Portfolio data',
    type: PortfolioResponseDto,
  })
  getPortfolio(): Promise<PortfolioResponseDto> {
    return this.stocksService.getPortfolio();
  }

  @Get('watchlist')
  @ApiOperation({ summary: 'Get watchlist data' })
  @ApiResponse({
    status: 200,
    description: 'Watchlist data',
    type: [StockResponseDto],
  })
  getWatchlist(): Promise<StockResponseDto[]> {
    return this.stocksService.getWatchlist();
  }
}
