import mongoose, { HydratedDocument, InferSchemaType, Model, Schema, model, models } from "mongoose";

const trainingLogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    animal: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    }
});

export const TrainingLog: Model<InferSchemaType<typeof trainingLogSchema>> = models.trainingLog ?? model('trainingLog', trainingLogSchema);

/**
 * Extracts the “plain” shape of your schema—
 * just the fields you defined, without Mongoose’s built-in methods or `_id`.
 */
export type TrainingLogType = InferSchemaType<typeof trainingLogSchema>;

/**
 * Represents a fully “hydrated” Mongoose document:
 * your fields plus all of Mongoose’s methods and metadata
 * (e.g. `_id`, `save()`, `populate()`, etc.).
 */
export type TrainingLogDocument = HydratedDocument<TrainingLogType>;