const db = require("../dbConfig/db");

const getActiveUsersByFenceName = async (req, res, next) => {
	const { fenceName } = req.params;
	const getFenceDetailsQuery = "SELECT * FROM fences WHERE name = ?";
	db.query(getFenceDetailsQuery, [fenceName], (err, result) => {
		if (err) {
			next(err);
		} else if (result.length > 0) {
			// console.log(result);
			const paths = result[0].paths;
			const place = result[0].place;
			const fenceId = result[0].id;
			db.query(
				"SELECT name, photo FROM users WHERE fence_id = ?",
				[fenceId],
				(err, results) => {
					if (err) {
						return res.status(400).json({
							message: "Failed to get active users",
						});
					} else if (results.length > 0) {
						console.log(results);
						res.status(200).json({
							message: "Successfully Got the User",
							users: results,
							paths: paths,
							place: place,
						});
					}
				}
			);
		}
	});
};

const pinPointLocation = async (req, res, next) => {
	const { date, time, userId } = req.params;
	const startTime = new Date(time);
	const endTime = new Date(time);
	startTime.setHours(startTime.getHours() - 1); // One hour before
	endTime.setHours(endTime.getHours() + 1); // One hour after

	const getCoordinatesQuery = `
        SELECT lat, lng 
        FROM tracker.attendance 
        WHERE date = ? 
        AND time BETWEEN ? AND ?
        AND user_id = ?`;

	const values = [date, startTime, endTime, userId];

	db.query(getCoordinatesQuery, values, (err, results) => {
		if (err) {
			return res.status(400).json({
				message: "Failed to get coordinates",
			});
		} else if (results.length > 0) {
			console.log(results);
			res.status(200).json({
				message: "Successfully got the coordinates!",
				coordinates: results,
			});
		}
	});
};

module.exports = { getActiveUsersByFenceName, pinPointLocation };
