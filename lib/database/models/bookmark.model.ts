// bookmark.model.ts

import { Schema, model, models } from 'mongoose';

const bookmarkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    loadout: {
        type: Schema.Types.ObjectId,
        ref: 'Loadout'
    }
});

const Bookmark = models.Bookmark || model('Bookmark', bookmarkSchema);

export default Bookmark;
