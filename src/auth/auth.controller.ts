import Route from '../route/route';
import { IncomingMessage, ServerResponse } from 'node:http';
import { AuthService } from './auth.service';

export class Auth {
  private service: AuthService = new AuthService();
  constructor() {
    Route.add('POST', 'auth', this.createUser.bind(this));
  }

  public createUser(req: IncomingMessage, res: ServerResponse) {
    const token = this.service.generateToken(req.body);
    res.status(200).setHeader('Set-Cookie', `token=${token}; Path=/;`).json({ message: 'Hello new user' });
  }
}
