import * as express from 'express';
import * as passport from 'passport';
import * as authController from '../lib/authController';

const twitterAuth = passport.authenticate('twitter');
const OAuthRouter: express.Router = express.Router();

const addSocketIdToSession = (req: any, res, next) => {
    req.session.socketId = req.query.socketId;
    next();
};

OAuthRouter.get('/twitter', addSocketIdToSession, twitterAuth);
OAuthRouter.get('/twitter/callback', twitterAuth, authController.twitter);

export {OAuthRouter};
