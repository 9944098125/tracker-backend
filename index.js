const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const createFenceRoute = require("./routes/createFenceRoute");
const trackingRoute = require("./routes/trackingRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", createFenceRoute);
app.use("/api", trackingRoute);

app.use((err, req, res, next) => {
	const errMessage = err.message;
	const errStatus = err.status;
	return res.status(errStatus).json({
		message: errMessage,
		status: errStatus,
		stack: err.stack,
		success: false,
	});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`App is now running on port ${port}`);
});
