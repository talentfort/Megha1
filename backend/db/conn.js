const mongoose = require("mongoose");

const DB = process.env.DATABASE;
const dbName = "pharmacy";
mongoose.set("strictQuery", false);
mongoose
  .connect(`${DB}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection sucessfull");
  })
  .catch((err) => console.log(`no connect ${err}`));
