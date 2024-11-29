import mongoose, { Schema, Document, Model } from "mongoose";

enum ItemStatus {
    Claimed = "Claimed",
    Unclaimed = "Unclaimed",
}

interface IItem extends Document {
    name: string;
    dateFound: string;
    locationFound: string;
    imageUrl?: string;
    status: ItemStatus;
}

const itemSchema = new Schema<IItem>({
    name: {
        type: String,
        required: true,
    },
    dateFound: {
        type: String,
        required: true,
    },
    locationFound: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(ItemStatus), // Ensures only "Claimed" or "Unclaimed" are stored
    },
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;
