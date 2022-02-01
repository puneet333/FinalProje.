import express, { Application } from 'express';
import { router as routPost } from './routes/UserPost';
import { router as routeAuth } from './routes/UserAuthRoutes';
import { router as routeUser } from './routes/userRoutes';


const app: Application = express();

// Middlewares use....
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routeAuth);
app.use(routPost);
app.use(routeUser);

export { app };