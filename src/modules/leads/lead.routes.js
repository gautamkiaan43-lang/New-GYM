import { Router } from "express";
import {
  addLead,
  getAllLeads,
  updateLead,
  deleteLead,
  getSuperAdminLeads,
} from "./lead.controller.js";

const router = Router();

// Create a new lead
router.post("/", addLead);

// Get all leads for an admin
router.get("/admin/:adminId", getAllLeads);

// Get all leads globally for Super Admin
router.get("/superadmin/all", getSuperAdminLeads);

// Update a lead
router.put("/:id", updateLead);

// Delete a lead
router.delete("/:id", deleteLead);

export default router;
