import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';

mongoose.plugin(uniqueValidator);

/**
 * User schema
 */
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: 'User with email "{VALUE}" already exist',
      lowercase: true,
      required: 'Email is required',
      trim: true,
    },
    hash: {
      type: String,
      unique: 'Hash must be unique',
    },
    password: {
      type: String,
      required: 'Password is required',
      trim: true,
    },
    firstName: {
      type: String,
      lowercase: true,
      required: 'First name is required',
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: 'Last name is required',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.createFields = [
  'email',
  'password',
  'firstName',
  'lastName',
];

/**
 * Hashes password
 * Creates hash
 * @return {void}
 */
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  if (!this.hash) {
    this.hash = uuid();
  }

  next();
});

/**
 * Compares passwords
 * @param {string} password
 * @return {boolean}
 */
UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', UserSchema);
