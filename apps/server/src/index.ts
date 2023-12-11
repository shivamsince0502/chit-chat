import http from 'http';

import ScoketService from './services/socket';

async function init() {
    const scoketService = new ScoketService();
    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    scoketService.io.attach(httpServer);
    httpServer.listen(PORT, ()=>{
        console.log("http server started at port ", PORT);
    });
    scoketService.initListners()

}

init();