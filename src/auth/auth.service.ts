import { createHmac } from 'node:crypto';

export class AuthService {
  public generateToken(data: any) {
    return createHmac('sha256', 'I love NodeJS').update(JSON.stringify(data)).digest('hex');
  }
}
