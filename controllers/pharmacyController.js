const Pharmacy = require("./../models/pharmacyModel");
const factory = require("./handlerFactory");

exports.getAllPharmacies = factory.getAll(Pharmacy);
exports.getOnePharmacy = factory.getOne(Pharmacy);
exports.updatePharmacy = factory.updateOne(Pharmacy);
exports.deletePharmacy = factory.deleteOne(Pharmacy);
exports.createPharmacy = factory.createOne(Pharmacy);
