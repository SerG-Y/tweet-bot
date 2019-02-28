import * as passport from 'passport';
import * as passportTwitter from 'passport-twitter';

export default () => {
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    const callback = (accessToken, refreshToken, profile, cb) => {
        cb(null, profile);
    };

    passport.use(new passportTwitter.Strategy({
        callbackURL: process.env.TWITTER_CALLBACK_URL,
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
    }, callback));
};
