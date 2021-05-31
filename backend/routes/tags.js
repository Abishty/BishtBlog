const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/tags");
const { runValidation } = require("../validators");
const { tagsCreateValidator } = require("../validators/tags");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post(
  "/tags",
  tagsCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
router.get("/tagslist", list);
router.get("/tags/:slug", read);
router.delete("/tags/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
