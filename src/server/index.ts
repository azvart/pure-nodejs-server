import { Server, IncomingMessage, ServerResponse } from 'node:http';
import Router from "../route/route";


export class NodeServer extends Server {
    private readonly port:number;
    private router = Router;
    constructor(port = 3000) {
        super();
        this.port = port;
        this.on('listening', () => {
            console.log(`Server running ${JSON.stringify(this.address())}`);
        })
        this.on('request', (req:IncomingMessage, res:ServerResponse) => {
            this.router.resolve(req ,res);
        });
        this.prependListener('request', (req:IncomingMessage, res:ServerResponse) => {
            console.log('Prepend listener before each request');

            if(req.headers['content-type'] === 'application/json'){
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });

                req.on('end', () => {
                    body = JSON.parse(body);
                    // req.body = body;
                })
            }

            if(req.headers['content-type']?.split(';')[0] === 'multipart/form-data'){
                const chunks:any[] = [];
                req.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                req.on('end', () => {
                    const result = Buffer.concat(chunks).toString('utf-8');
                    // req.body = result;
                });
            }
        });
    }

    public start(){
        this.listen(this.port, '127.0.0.1');
    }

    public controllers(controller:any[]){
        for(const routes of controller){
            new routes()
        }
    }


}
