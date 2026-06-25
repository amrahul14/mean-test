const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/orderController");
const authMiddleware = require("../middleware/auth");

// Saare order routes protected hain — pehle token check hoga
router.use(authMiddleware);

router.post("/", ctrl.create);
router.get("/:id", ctrl.getOne);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
