import * as express from 'express';
import * as http from 'http';
import * as Twitter from 'node-tweet-stream';
import * as socketIO from 'socket.io';
import * as cors from 'cors';

const PORT = process.env.PORT || 3000;
const app: express.Application = express();
const server = http.createServer(app);
const io = socketIO.listen(server);
// const tw = Twitter({
//     consumer_key: process.env.CONSUMER_KEY,
//     consumer_secret: process.env.CONSUMER_SECRET,
//     token: process.env.TOKEN,
//     token_secret: process.env.TOKEN_SECRET
// });

app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

io.on('connection', socket => {
    console.log('User connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

// tw.track('socket.io');
// tw.track('javascript');
// tw.on('tweet', (tweet) => {
//     io.emit('tweet', {
//         text: tweet.text,
//         name: tweet.user.name,
//         created_at: tweet.created_at
//     });

//     console.log(tweet.text);
// });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} !`);
});