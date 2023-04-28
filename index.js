const c = require("ansi-colors");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jobRoutes = require("./routes");

dotenv.config();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(c.green.bgWhite("Connected to database")))
  .catch((err) => console.error(c.red(err)));

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", jobRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
