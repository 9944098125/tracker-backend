const {
	createFence,
	getFences,
	createUser,
	getUsersByBranchDept,
	getUsersByNames,
	assignUserToFence,
	getAllUsers,
} = require("../controllers/createFenceController");

const router = require("express").Router();

router.route("/fence").post(createFence);

router.route("/fences").get(getFences);

router.route("/user").post(createUser);

router.route("/users/branch/dept").get(getUsersByBranchDept);

router.route("/users/names/:branch/:department").get(getUsersByNames);

router.route("/assignUserToFence").post(assignUserToFence);

router.route("/users").get(getAllUsers);

module.exports = router;
