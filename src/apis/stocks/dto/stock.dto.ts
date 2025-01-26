import { ApiProperty } from '@nestjs/swagger';

export class StockResponseDto {
  @ApiProperty({ example: 'AAPL', description: 'Stock symbol' })
  symbol: string;

  @ApiProperty({ example: 'Apple Inc.', description: 'Company name' })
  name: string;

  @ApiProperty({ example: 150.25, description: 'Current stock price' })
  price: number;

  @ApiProperty({ example: 2.5, description: 'Price change' })
  change: number;

  @ApiProperty({ example: 1.67, description: 'Percentage price change' })
  changePercent: number;
}

export class PortfolioResponseDto {
  @ApiProperty({ example: 12535.0, description: 'Total portfolio value' })
  totalValue: number;

  @ApiProperty({ example: 32.5, description: 'Total portfolio change' })
  totalChange: number;

  @ApiProperty({
    example: 0.48,
    description: 'Total portfolio change percentage',
  })
  totalChangePercent: number;

  @ApiProperty({ example: 840.5, description: 'Available buying power' })
  buyingPower: number;
}
