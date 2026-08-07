import mongoose, { Schema } from "mongoose";

export interface IRequest{
  name: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: string;
  collection: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const requestSchema = new Schema<IRequest>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    method: {
      type: String,
      required: true,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    headers: {
      type: Schema.Types.Mixed,
      default: {},
    },

    queryParams: {
      type: Schema.Types.Mixed,
      default: {},
    },

    body: {
      type: String,
      default: "",
    },

    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
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

export const Request = mongoose.model<IRequest>(
  "Request",
  requestSchema
);