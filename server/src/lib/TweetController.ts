import * as Twitter from 'node-tweet-stream';
import User from '../models/User';

export class TweetController {

    private users: { [socketId: string]: { keywords: [string], userId: string } };
    private keywords: string[];
    private tw: any;
    private io: SocketIO.Server;

    constructor(io: SocketIO.Server) {
        this.users = {};
        this.io = io;
        this.keywords = [];
        this.tw = Twitter({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            token: process.env.TOKEN,
            token_secret: process.env.TOKEN_SECRET
        });

        this.listenTweets();
    }

    public addUser(userId: string, socketId: string, keywords: [string]): void {
        if (this.users.hasOwnProperty(socketId)) {
            return;
        }

        this.users[`${socketId}`] = {
            keywords,
            userId
        };

        for (const keyword of keywords) {
            this.keywords.push(keyword);
            this.tw.track(keyword);
        }

        this.tw.reconnect();
    }

    public removeUser(socketId: string): void {
        if (!this.users[socketId]) {
            return;
        }

        for (const keyword of this.users[socketId].keywords) {
            this.tw.untrack(keyword);
        }

        delete this.users[socketId];

        if (Object.keys(this.users).length === 0) {
            this.tw.untrackAll();
        }

        this.tw.reconnect();
    }

    public addKeyword(socketId: string, keyword: string): void {
        User.findOneAndUpdate({ userId: this.users[socketId].userId },
            { $push: { keywords: keyword } }, (err, user) => {
                if (err) {
                    console.error(err);
                }

                this.users[socketId].keywords.push(keyword);
                this.keywords.push(keyword);
                this.tw.track(keyword);
            });
    }

    public removeKeyword(socketId: string, keyword: string): void {
        User.findOneAndUpdate({ userId: this.users[socketId].userId },
            { $pullAll: { keywords: [keyword] } }, (err, user) => {
                if (err) {
                    console.error(err);
                }

                const indexKeyword = this.keywords.indexOf(keyword);
                const indexUserKeyword = this.users[socketId].keywords.indexOf(keyword);

                this.keywords.splice(indexKeyword, 1);
                this.users[socketId].keywords.splice(indexUserKeyword, 1);

                this.tw.untrack(keyword);
            });
    }

    private listenTweets(): void {
        this.tw.on('tweet', (tweet) => {
            const tweetData = {
                created_at: tweet.created_at,
                name: tweet.user.name,
                text: tweet.text,
                userPhoto: tweet.user.profile_image_url_https
            };

            for (const keyword of this.keywords) {
                if (tweet.text.includes(keyword)) {
                    for (const id in this.users) {
                        if (this.users[id].keywords.includes(keyword)) {
                            this.io.in(id).emit('tweet', tweetData);
                        }
                    }
                }
            }
        });
    }
}
