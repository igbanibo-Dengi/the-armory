import { Document, Schema, model, models } from "mongoose";

export interface ILoadout extends Document {
    _id: string;
    title: string;
    weapon: string;
    gameMode?: string;
    description?: string;
    firstAttachment: string
    secondAttachment: string
    thirdAttachment: string
    fourthAttachment: string
    fifthAttachment: string
    firstSlot: string,
    secondSlot: string,
    thirdSlot: string,
    fourthSlot: string,
    fifthSlot: string,
    createdAt: Date;
    imageUrl: string;
    category: { _id: string, name: string }
    creator: { _id: string, firstName: string, lastName: string }
}

const LoadoutSchema = new Schema({
    title: { type: String, required: true },
    weapon: { type: String, required: true },
    gameMode: { type: String },
    description: { type: String },
    firstAttachment: { type: String, required: true },
    secondAttachment: { type: String, required: true },
    thirdAttachment: { type: String, required: true },
    fourthAttachment: { type: String, required: true },
    fifthAttachment: { type: String, required: true },
    firstSlot: { type: String, required: true },
    secondSlot: { type: String, required: true },
    thirdSlot: { type: String, required: true },
    fourthSlot: { type: String, required: true },
    fifthSlot: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Loadout = models.Loadout || model('Loadout', LoadoutSchema);

export default Loadout;