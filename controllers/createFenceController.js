const db = require("../dbConfig/db");

const createFence = async (req, res, next) => {
	try {
		const { name, paths, place } = req.body;
		const createFenceQuery =
			"INSERT INTO fences (name, paths, place) VALUES (?, ?, ?)";
		const values = [name, JSON.stringify(paths), place];
		db.query(createFenceQuery, values, (err, result) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: "Failed to create fence",
					error: err,
				});
			} else {
				res.status(201).json({
					message: "Successfully created fence",
				});
			}
		});
	} catch (err) {
		next(err);
	}
};

const getFences = async (req, res, next) => {
	try {
		const getFencesQuery = "SELECT name FROM fences";
		db.query(getFencesQuery, (err, results) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: "Failed to get fences",
					error: err,
				});
			} else {
				res.status(200).json({
					message: "Successfully got fences",
					results,
				});
			}
		});
	} catch (err) {
		next(err);
	}
};

const createUser = async (req, res, next) => {
	try {
		const { name, email, password, photo, department, branch } = req.body;
		const createUserQuery =
			"INSERT INTO users (name, email, password, photo, department, branch) VALUES (?, ?, ?, ?, ?, ?)";
		const values = [name, email, password, photo, department, branch];
		db.query(createUserQuery, values, (err, result) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: "Failed to create user",
					error: err,
				});
			} else if (result.affectedRows > 0) {
				res.status(201).json({
					message: "Successfully created user",
				});
			}
		});
	} catch (err) {
		next(err);
	}
};

const getUsersByBranchDept = async (req, res, next) => {
	try {
		const getUsersQuery = "SELECT name, branch, department FROM users";
		db.query(getUsersQuery, (err, results) => {
			if (err) {
				return res.status(400).json({
					message: "Failed to get users",
					error: err,
				});
			} else if (results.length > 0) {
				return res.status(200).json({
					message: "Successfully got users",
					results,
				});
			}
		});
	} catch (err) {
		next(err);
	}
};

const getUsersByNames = async (req, res, next) => {
	try {
		const { department, branch } = req.params;
		const getUsersQuery =
			"SELECT name FROM users WHERE department = ? AND branch = ?";
		db.query(getUsersQuery, [department, branch], (err, results) => {
			if (err) {
				return res.status(400).json({
					message: "Failed to get users",
					error: err,
				});
			} else if (results.length > 0) {
				return res.status(200).json({
					message: "Successfully got users",
					results: results,
				});
			}
		});
	} catch (err) {
		next(err);
	}
};

const assignUserToFence = async (req, res, next) => {
	const { fenceName, branch, department, username } = req.body;
	const getFenceIdQuery = "SELECT id FROM fences WHERE name = ?";
	db.query(getFenceIdQuery, [fenceName], (err, results) => {
		if (err) {
			return res.status(400).json({
				message: "Failed to get fence",
			});
		} else if (results) {
			console.log("fences table", results[0].id);
			const fenceId = results[0].id;
			db.query(
				"UPDATE users SET fence_id = ? WHERE name = ? AND branch = ? AND department = ?",
				[fenceId, username, branch, department],
				(err, result) => {
					if (err) {
						return res.status(405).json({
							message: "Failed to assign fence to user",
							error: err,
						});
					} else if (result.affectedRows > 0) {
						res.status(201).json({
							message: `Assigned ${username} to ${fenceName} Successfully !`,
						});
					}
				}
			);
		}
	});
};

const getAllUsers = async (req, res, next) => {
	const getUsersQuery = "SELECT name FROM users";
	db.query(getUsersQuery, (err, results) => {
		if (err) {
			return res.status(400).json({
				message: "Failed to get the users",
			});
		} else if (results.length > 0) {
			res.status(200).json({
				message: "Retrieved the users Successfully",
				users: results,
			});
		}
	});
};

module.exports = {
	createFence,
	getFences,
	createUser,
	getUsersByBranchDept,
	getUsersByNames,
	assignUserToFence,
	getAllUsers,
};
