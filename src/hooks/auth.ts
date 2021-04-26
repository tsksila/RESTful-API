import { FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken'
import customError from '../utils/custom-error'
import authErrors from '../errors/auth'
import config from '../config'
import {AccessTokenVerify} from '../types/hooks/auth'




const validateHeadersAuth = (request : FastifyRequest): string => {
  const authToken: string | undefined = request.headers['authorization']
  if (!authToken) {
    return customError(authErrors.AuthMissingHeaders)
  }

  const accessToken = authToken.split(' ')[1]
  if (!accessToken) {
    customError(authErrors.AuthMissingHeaders)
  }

  return accessToken

}

export const verifyAccessToken = async (request: FastifyRequest): Promise<boolean> => {
  try {
    const accessToken = validateHeadersAuth(request)

    var decoded: AccessTokenVerify = Object(jwt.verify(accessToken, config.secret.accessToken)) 

    request.userID = decoded.aud
    request.admin = decoded.admin

    return true
  } catch (error) {

    return customError(authErrors.AuthJWTError)
  }
}


export const verifyAdminAccess = async (request : FastifyRequest) : Promise<boolean> => {
     
    await verifyAccessToken(request)

    if (request.admin === true) {
      return true
    }else {
      customError(authErrors.AccessDenied)
    }

}

export  default {
  verifyAccessToken,
  verifyAdminAccess
}

