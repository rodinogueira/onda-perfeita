import mongoose, { Document, Model, Schema } from 'mongoose';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  W = 'W',
  N = 'N',
}

export interface Beach {
  _id?: string;
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: object;
}

interface BeachDocument extends Omit<Beach, '_id'>, Document {}

const beachSchema = new mongoose.Schema<BeachDocument>(
  {
    name: { type: String, required: true },
    position: { type: String, enum: Object.values(BeachPosition), required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const BeachModel: Model<BeachDocument> = mongoose.model<BeachDocument>('Beach', beachSchema);

export default BeachModel;
