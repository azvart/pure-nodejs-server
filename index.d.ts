import 'http';


declare module 'http' {
    interface IncomingMessage {
        body?:any
    }

    interface ServerResponse {
        status: (statusCode:number) => ServerResponse
        json: (data:any) => void
        sendFile: (path:string, mime:string) => Promise<void>
    }
}
