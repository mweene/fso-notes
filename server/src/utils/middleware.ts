import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { logger }  from './logger.js'

const requestLogger = ( req:Request, res:Response, next:NextFunction ) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const unKnownEndpoint = ( req:Request, res:Response ) => {
  res.status(404).json({error: 'unknown endpoint'})
}

const errorHandler = ( error:ErrorRequestHandler, req:Request, res:Response, next:NextFunction ) => {
  logger.error(error)
  
  if (error.name === 'CastError') 
    return res.status(400).send({ error: 'malformatted id' })

  if (error.name === 'ValidationError') 
    return res.status(400).json({ error: error })

  next(error)
}

export {
  requestLogger,
  errorHandler,
  unKnownEndpoint
}
