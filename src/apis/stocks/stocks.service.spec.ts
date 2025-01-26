import { Test, type TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { LoggerService } from '../logger/logger.service';
import { PolygonService } from '../polygon/polygon.service';

describe('StocksService', () => {
  let service: StocksService;
  let polygonService: PolygonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        {
          provide: PolygonService,
          useValue: {
            getStockAggregates: jest.fn(),
            getCompanyDetails: jest.fn(),
          },
        },
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
    polygonService = module.get<PolygonService>(PolygonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPortfolio', () => {
    it('should return portfolio data', async () => {
      const result = await service.getPortfolio();
      expect(result).toHaveProperty('totalValue');
      expect(result).toHaveProperty('totalChange');
      expect(result).toHaveProperty('totalChangePercent');
      expect(result).toHaveProperty('buyingPower');
    });
  });

  describe('getWatchlist', () => {
    it('should return watchlist data', async () => {
      const mockAggregates = {
        results: [{ c: 100, o: 90 }],
      };
      const mockDetails = {
        results: {
          name: 'Test Company',
        },
      };
      (polygonService.getStockAggregates as jest.Mock).mockResolvedValueOnce(
        mockAggregates,
      );
      (polygonService.getCompanyDetails as jest.Mock).mockResolvedValueOnce(
        mockDetails,
      );

      const result = await service.getWatchlist();
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('symbol');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('price');
      expect(result[0]).toHaveProperty('change');
      expect(result[0]).toHaveProperty('changePercent');
    });

    it('should handle API errors', async () => {
      (polygonService.getStockAggregates as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );

      await expect(service.getWatchlist()).resolves.toEqual([]);
    });
  });
});
