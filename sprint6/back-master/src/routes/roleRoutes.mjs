// routes/roleRoutes.mjs
import { Router } from "express";
import { assignRoleToUser } from "../controllers/roleController.mjs";
import { authenticate } from "../middleware/authenticate.mjs";
import { authorize } from "../middleware/authorize.mjs";

const router = Router();

// Solo administradores pueden reasignar roles
router.post(
  "/assign-role",
  authenticate(),            // verifica JWT
  authorize("admin"),        // verifica que user.role === "admin"
  assignRoleToUser
);

export default router;
