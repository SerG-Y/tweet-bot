import User from '../models/User';

export const twitter = (req, res) => {
    const io = req.app.get('io');
    const userData = {
        keywords: [],
        name: req.user.username,
        photo: req.user.photos[0].value.replace(/_normal/, ''),
    };

    User.findOne({ userId: req.user.id }, (err, user: any) => {
        if (err) {
            console.error(err);
        }

        if (!user) {
            const { id } = req.user;

            User.create({ userId: id, keywords: [] }, (err, user) => {
                if (err) {
                    console.error(err);
                }

                req.app.get('tw').addUser(user.userId, req.session.socketId, user.keywords);
                io.in(req.session.socketId).emit('twitter', userData);
            });
        } else {
            userData.keywords = user.keywords;
            req.app.get('tw').addUser(user.userId, req.session.socketId, user.keywords);
            io.in(req.session.socketId).emit('twitter', userData);
        }
    });

};
