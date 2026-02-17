const express = require("express");
const app = express();
const authRouter = express.Router();
app.use(express.json());

authRouter.post("/signup", async (req,res) => {
      
});

module.exports = authRouter;