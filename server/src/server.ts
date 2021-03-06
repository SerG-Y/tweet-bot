import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as fs from 'fs';
import * as https from 'https';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as path from 'path';
import * as socketIO from 'socket.io';
import passportInit from './lib/passportInit';
import {TweetController} from './lib/TweetController';
import { OAuthRouter } from './routes/OAuthRouter';

const certOptions = {
    cert: fs.readFileSync(path.resolve('certs/server.crt')),
    key: fs.readFileSync(path.resolve('certs/server.key'))
};
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const app: express.Application = express();
const server = https.createServer(certOptions, app);
const io = socketIO.listen(server);
const tw = new TweetController(io);

mongoose.connect(process.env.MONGO_URL, (err) => {
    if (!err) {
        console.log('connected to db');
    }
});

app.use(express.json());
app.use(passport.initialize());
app.use(cors({ credentials: true, origin: CLIENT_ORIGIN }));

passportInit();

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
}));

app.set('io', io);
app.set('tw', tw);
app.use('/', OAuthRouter);

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('disconnect', () => {
        tw.removeUser(socket.id);
        console.log(`User ${socket.id} disconnected`);
    });

    socket.on('addKeyword', (keyword: string) => {
        tw.addKeyword(socket.id.toString(), keyword);
    });

    socket.on('removeKeyword', (keyword: string) => {
        tw.removeKeyword(socket.id.toString(), keyword);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} !`);
});
