import mongoose, { Schema } from "mongoose";

export interface IHistory {
  user: mongoose.Types.ObjectId;
  request: mongoose.Types.ObjectId;
  status: number;
  response: unknown;
}

const historySchema = new Schema<IHistory>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    request: {
      type: Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },

    status: {
      type: Number,
      required: true,
    },

    response: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const History = mongoose.model<IHistory>(
  "History",
  historySchema
);