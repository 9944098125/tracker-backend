const router = require("express").Router();

const {
	getActiveUsersByFenceName,
	pinPointLocation,
} = require("../controllers/trackingController");

router.route("/getActiveUsers/:fenceName").get(getActiveUsersByFenceName);

router.route("/getCoordinates/:date/:time/:userId").get(pinPointLocation);

module.exports = router;
