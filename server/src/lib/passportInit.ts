import * as passport from 'passport';
import * as passportTwitter from 'passport-twitter';

export default () => {
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

    passport.use(new passportTwitter.Strategy({
        callbackURL: 'https://localhost:3000/twitter/callback',
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
    }, callback));
};
