import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (payload: object, secret: Secret, expireTime: string) => {
   return jwt.sign(payload, secret, { expiresIn: expireTime as any as number });
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = { createToken, verifyToken };
