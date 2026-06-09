import { Router } from "express";
// import { verifyToken } from "../../middlewares/auth.js";
import { getDashboardData,getSuperAdminDashboard,getReceptionistDashboard, getSuperAdminCRMStats } from "./dashboard.controller.js";

const router = Router();
router.get("/dashboard", getSuperAdminDashboard);
router.get("/crm-stats", getSuperAdminCRMStats);
router.get("/recepitonishdsh",getReceptionistDashboard )
router.get("/",  getDashboardData);

export default router;
