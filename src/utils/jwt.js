import { SignJWT } from 'jose';
import 'dotenv/config';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateToken = async (payload) => {
  console.log('payload',payload);
  const secure_payload = {
    id: payload.id, 
    role: payload.role
  };
  console.log('secure_payload',secure_payload);
  return await new SignJWT(secure_payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
};
