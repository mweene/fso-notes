import type {Request, Response, NextFunction, ErrorRequestHandler} from 'express'

export const errorHandler = (error:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
  console.error(error)

  if(error.name === 'CastError')
    return res.status(400).json({error: 'malformed id'})

  next(error)
}
