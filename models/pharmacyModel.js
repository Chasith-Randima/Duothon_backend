const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { bool } = require("sharp");

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name..."],
  },
  email: {
    type: String,
    required: [true, "Please tell us your email..."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email address..."],
  },
  address: {
    type: String,
    required: [true, "Plerase tell us your address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please tell us your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please choose a password..."],
    minlength: 8,
  },
  pharmacyLicense: {
    type: String,
    required: [true, "Please tell us your license number"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password..."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  approved: {
    type: Boolean,
    default: false,
  },
  // phones: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Phone",
  // },
  passwordChangedAt: Date,
});

pharmacySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

pharmacySchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;
  next();
});

pharmacySchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

pharmacySchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000.1
    );
    return JWTTimestamp < changedTimestamp;
  }
};

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
module.exports = Pharmacy;
