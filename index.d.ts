import 'http';


declare module 'http' {
    interface IncomingMessage {
        body?:any
    }
}
