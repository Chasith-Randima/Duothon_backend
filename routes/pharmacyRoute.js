const express = require("express");
const pharmacyAuthController = require("./../controllers/pharmacyAuth");
const pharmacyController = require("./../controllers/pharmacyController");

const router = express.Router();

// router.post("/signup", () => {
//   console.log("Workig...");
// });
router.post("/signup", pharmacyAuthController.signup);
router.post("/login", pharmacyAuthController.login);
// router.get("/logout", pharmacyAuthController.logout);

router.patch("/updateMyPassword/:id", pharmacyAuthController.updatePassword);

router
  .route("/")
  .get(pharmacyController.getAllPharmacies)
  .post(pharmacyController.createPharmacy);

router.use(pharmacyAuthController.protect);
router
  .route("/:id")
  .get(pharmacyController.getOnePharmacy)
  // .get(pharmacyAuthController.restrictTo("admin"), pharmacyController.getOneUser)
  .patch(pharmacyController.updatePharmacy)
  .delete(pharmacyController.deletePharmacy);

module.exports = router;
