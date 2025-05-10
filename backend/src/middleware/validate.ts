import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export function validateRequest(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Validation Error',
          details: error.errors
        })
      } else {
        next(error)
      }
    }
  }
}
