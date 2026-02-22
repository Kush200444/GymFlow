const express = require("express");
const gymRouter = express.Router();
const { authorizeRoles } = require("../middlewares/authorizeRoles");
const {userAuth} = require("../middlewares/userAuth");
const Gym = require("../models/gym");
const {validateGymEditData} = require("../utils/validate");



gymRouter.get("/gym", userAuth, authorizeRoles("owner"), async (req, res) => {
  try {
    const owner = req.user;
    const gym = await Gym.findOne({ ownerId: owner._id });
    if (!gym) return res.status(404).json({ message: "Gym not found" });
    return res.status(200).json({ message: "Gym data fetched successfully", gym });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

gymRouter.patch("/gym", userAuth, authorizeRoles("owner"), async (req, res) => {
  try {
    validateGymEditData(req);
    const owner = req.user;
    const gym = await Gym.findOne({ ownerId: owner._id });
    if (!gym) return res.status(404).json({ message: "Gym not found" });
    Object.keys(req.body).forEach((key) => (gym[key] = req.body[key]));
    await gym.save();
    return res.json({ message: `Gym updated successfully`, data: gym });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


module.exports = gymRouter;