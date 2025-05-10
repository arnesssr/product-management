import { Request, Response, NextFunction } from 'express'

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err)

  if (err.type === 'validation') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors
    })
  }

  if (err.code === '23505') { // PostgreSQL unique violation
    return res.status(409).json({
      error: 'Duplicate Entry',
      details: err.detail
    })
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
}
