import { Request, Response, NextFunction } from 'express';

export function loggingMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const uuid = crypto.randomUUID();
  const method = request.method;
  const url = request.url;

  console.log(
    `Start request ID: ${uuid} - Method: ${method} - URL: ${url} - Timestamp: ${new Date().toISOString()}`,
  );

  response.on('finish', () => {
    console.log(`End request ID: ${uuid} - Method: ${method} - URL: ${url}`);
  });

  next();
}
