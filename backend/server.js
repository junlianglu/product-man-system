import app from "./app.js"
import dotenv from "dotenv"
import mogoDB from "./config/db.js"

dotenv.config();
mogoDB();
app.listen(process.env.PORT || 5001, () => {console.log(`connect server successfully`)});