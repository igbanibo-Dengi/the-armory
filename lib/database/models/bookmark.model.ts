// bookmark.model.ts

import { Schema, model, models } from 'mongoose';

export type IBookmarks = {
    user: string;
    loadout: string;
}

const bookmarkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    loadout: {
        type: Schema.Types.ObjectId, ref: 'Loadout'
    },
    createdAt: { type: Date, default: Date.now },

});

const Bookmark = models.Bookmark || model('Bookmark', bookmarkSchema);

export default Bookmark;
