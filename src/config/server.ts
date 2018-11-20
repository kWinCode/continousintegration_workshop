import * as Express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as bodyParser from 'body-parser';

require('dotenv').config();

import { UserRestController } from "../rest";

export default class Server
{
    private server: any;
    public api: any;
    private app: any;

    // Controllers
    private userRestController: UserRestController;

    constructor()
    {
        // const cred = this.loadCredentials();

        this.app = new Express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // this.server = https.createServer(cred, this.app);
        this.server = http.createServer(this.app);

        // Create Controller
        this.userRestController = new UserRestController(this.app);


        this.api = this.server.listen(process.env.PORT, () => {
            console.log('Express runs on Port ' + process.env.PORT);
        });
    }

    private loadCredentials(): any
    {
        const cert = fs.readFileSync('cert/server.cert');
        const key = fs.readFileSync( 'cert/server.key');

        return {
            key: key,
            cert: cert
        };
    }
}

