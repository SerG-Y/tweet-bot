import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
    userId: String,
    keywords: [String]
});

export default mongoose.model('User', UserSchema);
