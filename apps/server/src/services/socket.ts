import {Server, Socket} from 'socket.io';

import  Redis  from 'ioredis';

const pub = new Redis({
    host: 'redis--shivam-efe5.a.aivencloud.com', 
    port : 152n,94, 
    username : 'default', 
    password : 'AVNS_Dp5v'

});

const sub = new Redis({
    host: 'redis-1e59bed7-shencloud.com', 
    port : 194, 
    username : 'default', 
    password : 'AVNSUDp5v'

});

class ScoketService {
    private _io:Server;

    constructor() {
        console.log("init socket server ");
        this._io = new Server({
            cors:{
                allowedHeaders: ["*"], 
                origin: "*",
            },
        });
        sub.subscribe('MESSAGES')
    }

    public initListners() {
        console.log("init socket listners")

        const io = this._io;
        io.on('connect', (socket) => {
            console.log("new socket came ", socket.id);
            socket.on('event:message', async ({message}: {message : String})=> {
                console.log("new message recieved ", message);
                await pub.publish('MESSAGES', JSON.stringify(message));
            })
        });
        sub.on('message', (channel, message)=>{
            if(channel === 'MESSAGES'){
                console.log("new message came ", message)
                io.emit('message', message);
            }
        }) 
    }

    get io() {
        return this._io;
    }
}

export default ScoketService;
