import { Server, IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import { nextTick } from 'node:process';
import Router from "../route/route";
import type { NodeServerOptions } from "../types/server.types";

export class NodeServer extends Server {
    static create(controllers:any[], options?:NodeServerOptions){
        const server = new NodeServer();
        server.controllers(controllers);
        server.start();
    }

    private readonly port:number;
    private router = Router;

    constructor(port = 3000) {
        super();
        this.port = port;
        this.on('listening', () => {
            console.log(`Server running ${JSON.stringify(this.address())}`);
        });
        this.on('request', (req:IncomingMessage, res:ServerResponse) => {
            let body = ''
            res.status = (code) => {
                res.statusCode = code;
                return res;
            }
            res.json = (data) => {
                res.setHeader("Content-Type","application/json");
                res.end(JSON.stringify(data));
            }
            req.on('data', (chunk) => {
                body += chunk.toString('utf-8')
            }).on('end', () => {
                body = JSON.parse(body);
                req.body = body;
                return this.router.resolve(req, res);
            })
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



    private errorMessage(req:IncomingMessage, res:ServerResponse,error:unknown){
        res.status(400).json(error);
    }

}
