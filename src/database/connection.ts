import * as Sequelize from 'sequelize';

export class Connection
{
    private static _instance: Connection;
    private _sequelize: any;
    private _user: any;

    private constructor()
    {

        this._sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            dialect: 'sqlite',
            storage: 'database.sqlite',
            operatorsAliases: { $and: Sequelize.Op.and },
            logging: false
        });

        this.initDatabaseTables();

        this._sequelize.sync();
    }

    public static getInstance(): Connection
    {
        if(Connection._instance === null || Connection._instance === undefined)
        {
            Connection._instance = new Connection();
        }

        return Connection._instance;
    }

    private initDatabaseTables():void
    {
        this._user = this._sequelize.define('user', {
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    }

    get user(): any 
    {
        return this._user;
    }

    get sequelize(): any 
    {
        return this._sequelize;
    }
}
