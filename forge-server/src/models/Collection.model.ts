import mongoose, { Schema } from "mongoose";

export interface ICollection extends mongoose.Document {
  name: string;
  user: mongoose.Types.ObjectId;
}

const collectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Collection = mongoose.model<ICollection>(
  "Collection",
  collectionSchema
);