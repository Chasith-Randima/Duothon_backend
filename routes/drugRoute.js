const express = require("express");
const drugController = require("./../controllers/drugController");
// const phoneController = require("./../controllers/phoneController");
const pharmacyAuthController = require("./../controllers/pharmacyAuth");
const router = express.Router();

// router.use("/image/:imageName", phoneController.getImage);
// router.use("/search", phoneController.searchPhones);
// router.use("/search", () => {
//   console.log("wokring");
// });
router.use("/search", drugController.searchDrugs);
router.route("/").get(drugController.getAllDrugs).post(
  pharmacyAuthController.protect,
  // phoneController.uploadPhoneImages,
  // phoneController.resizePhoneImages,
  drugController.createDrug
);
router
  .route("/:id")
  .get(drugController.getOneDrug)
  .patch(
    pharmacyAuthController.protect,
    // phoneController.uploadPhoneImages,
    // phoneController.resizePhoneImages,
    drugController.updateDrug
  )
  .delete(pharmacyAuthController.protect, drugController.deleteDrug);

module.exports = router;
