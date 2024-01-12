import { IncomingMessage, ServerResponse } from 'node:http';
import { EventEmitter } from 'node:events';

class Route extends EventEmitter {
  static instance: Route;
  constructor() {
    super();
    if (!Route.instance) {
      Route.instance = this;
    }

    return Route.instance;
  }

  public add(method: string, path: string, handler: (req: IncomingMessage, res: ServerResponse) => void) {
    super.addListener(`${method} /${path}`, handler);
  }

  public resolve(req: IncomingMessage, res: ServerResponse) {
    const { url, method } = req;
    const isEmitting = this.emit(`${method} ${url}`, req, res);
    if (!isEmitting) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Page not found' }));
    }
  }
}

export default new Route();
