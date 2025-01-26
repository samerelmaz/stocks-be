import { Test, type TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../http/http.service';
import { PolygonService } from './polygon.service';

describe('PolygonService', () => {
  let service: PolygonService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolygonService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'polygon.apiKey') return 'test-api-key';
              if (key === 'polygon.baseUrl') return 'https://api.polygon.io';
              return null;
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            fetch: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PolygonService>(PolygonService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStockAggregates', () => {
    it('should return stock aggregates data', async () => {
      const mockResponse = {
        results: [{ c: 100, o: 90 }],
      };
      (httpService.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.getStockAggregates('AAPL');
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      (httpService.fetch as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );

      await expect(service.getStockAggregates('AAPL')).rejects.toThrow(
        'API Error',
      );
    });
  });

  describe('getCompanyDetails', () => {
    it('should return company details', async () => {
      const mockResponse = {
        results: {
          name: 'Apple Inc.',
          ticker: 'AAPL',
        },
      };
      (httpService.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.getCompanyDetails('AAPL');
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      (httpService.fetch as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );

      await expect(service.getCompanyDetails('AAPL')).rejects.toThrow(
        'API Error',
      );
    });
  });
});
