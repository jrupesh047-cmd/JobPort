import connect from "./db/connect.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const startSever = async() => {
  try {
    await connect();

    app.listen(process.env.PORT, () => {
      console.log(`Severe is Listning of the ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Connection Issue:", error);
  }
};
startSever();


