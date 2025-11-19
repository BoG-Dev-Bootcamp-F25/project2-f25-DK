import mongoose, { HydratedDocument, InferSchemaType, Model, Schema, model, models } from "mongoose";

const animalSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
    breed: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hoursTrained: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String,
        required: true,
    }
});

export const Animal: Model<InferSchemaType<typeof animalSchema>> = models.animal ?? model('animal', animalSchema);

/**
 * Extracts the “plain” shape of your schema—
 * just the fields you defined, without Mongoose’s built-in methods or `_id`.
 */
export type AnimalType = InferSchemaType<typeof animalSchema>;

/**
 * Represents a fully “hydrated” Mongoose document:
 * your fields plus all of Mongoose’s methods and metadata
 * (e.g. `_id`, `save()`, `populate()`, etc.).
 */
export type AnimalDocument = HydratedDocument<AnimalType>;