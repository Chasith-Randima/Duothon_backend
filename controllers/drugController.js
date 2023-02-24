// const User = require("./../models/userModel");
const Drug = require("./../models/drugModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");

exports.getAllDrugs = factory.getAll(Drug);
exports.getOneDrug = factory.getOne(Drug);
exports.updateDrug = factory.updateOne(Drug);
exports.deleteDrug = factory.deleteOne(Drug);
exports.createDrug = factory.createOne(Drug);

exports.searchDrugs = catchAsync(async (req, res) => {
  const { search } = req.query;
  console.log(search);

  if (search) {
    await Drug.find(
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          // { model: { $regex: search, $options: "i" } },
          // { slug: { $regex: search, $options: "i" } },
          // { condition: { $regex: search, $options: "i" } },
        ],
      }
      // (err, phones) => {
      //   if (err) {
      //     console.log(err);
      //     // res.status(500).json({
      //     //   status: "failed",
      //     //   message: "There was an error...",
      //     // });
      //   }
      //   console.log(phones);

      //   res.status(200).json(phones);
      // }
    )
      .select(
        "_id idNumber name"
        //   "-images -description -network -sim -os -memory -main_camera -selfie_camera -sound -wifi -bluetooth -radio -usb -sensors -location -phoneNumber -price -createdAt -user"
      )
      .then((data) => {
        // console.log(data);
        res.status(200).json({
          status: "success",
          message: `${data.length} found...`,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "failed",
          message: err,
        });
      });
  }
});
