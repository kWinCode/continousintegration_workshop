
import { UserController } from "../controller";
import { RestController } from "./restController";
import { RoutesInterface } from "./routesInterface";

export class UserRestController extends RestController implements RoutesInterface
{

    constructor(app: any)
    {
        super(app, new UserController());
        this.setRoutes();
    }

    setRoutes(): void
    {
        // user Routes
        this.app.route('/users')
        .get((req, res) => this.controller.findAllUsers(req, res))
        .post((req, res) => this.controller.createUser(req, res));


        this.app.route('/users/:userId')
        .delete((req, res) => this.controller.deleteUser(req, res));

        this.app.route('/users/login')
            .get((req, res) => this.controller.loginUser(req, res));
    }
}