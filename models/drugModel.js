const mongoose = require("mongoose");
const slugify = require("slugify");

const drugSchema = new mongoose.Schema(
  {
    idNumber: {
      type: String,
      required: [true, "Drug must have id"],
    },
    name: {
      type: String,
      required: [true, "Drug must have a name"],
    },
    manufacturer: {
      type: String,
      required: [true, "Drug must have a manufacturer"],
    },
    supplier: {
      type: String,
      required: [true, "Drug must have a supplier"],
    },
    NDC: {
      type: String,
      required: [true, "Drug must have a NDC"],
    },
    expireDate: {
      type: Date,
      required: [true, "Drug must have a expre date.."],
    },
    quantity: {
      type: Number,
      required: [true, "Must have a quontity"],
    },
    unitPrice: {
      type: Number,
      required: [true, "Must have a unit price..."],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    slug: {
      type: String,
    },
    pharmacy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Pharmacy",
      },
    ],
  }
  // { typeKey: "$type" }
);

drugSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

drugSchema.pre(/^find/, function (next) {
  this.populate({
    path: "pharmacy",
    select: "-__v -passwordChangedAt -password",
  });
  next();
});

// phoneSchema.virtual("user_virtual", {
//   ref: "User",
//   foreignField: "_id",
//   localField: "user",
// });

const Drug = mongoose.model("Drug", drugSchema);

module.exports = Drug;
