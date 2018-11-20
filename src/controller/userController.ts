
import { Connection } from '../database';
import * as bcrypt from 'bcrypt';

export class UserController
{
    private database: Connection;

    constructor()
    {
        this.database = Connection.getInstance();
    }

    public createUser(req: any, res: any): void
    {
        bcrypt.hash(req.body.password, 10, (error, hash)=> {
            this.database.user.create({username: req.body.username, password: hash, email: req.body.email}).then( user => {
                res.status(201).json(user);
            }).catch((err) => {
                res.status(400).json(err);
            });
        });
         
    }

    public findAllUsers(req: any, res: any): void
    {
        this.database.user.findAll().then( users => {
            res.status(200).json(users);
        }).catch((err) => {
            res.status(400).json(err);
        }); 
    }

    public loginUser(req: any, res: any): void
    {
        const username = req.body.username;
        const password = req.body.password;

        this.database.user.findOne({where: {username} }).then( user => {
            bcrypt.compare(password, user.password, (err, matched) =>{
                if(matched){
                    res.status(200).json(user);
                }else{
                    res.status(400).json(err);
                }
            });            
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    public deleteUser(req: any, res: any): void
    {
        this.database.user.destroy({where: {id: req.params.userId}}).then( () => {
            res.sendStatus(200);
        }).catch((err) => {
            res.status(400).json(err);
        });
    }
}