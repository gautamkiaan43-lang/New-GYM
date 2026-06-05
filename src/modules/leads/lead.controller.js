import {
  addLeadService,
  getAllLeadsService,
  updateLeadService,
  deleteLeadService,
  getSuperAdminLeadsService,
} from "./lead.service.js";

export const addLead = async (req, res, next) => {
  try {
    const data = await addLeadService(req.body);
    res.status(201).json({
      success: true,
      message: "Lead added successfully",
      lead: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllLeads = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    if (!adminId) {
      return res.status(400).json({ success: false, message: "adminId is required" });
    }
    const leads = await getAllLeadsService(adminId);
    res.json({
      success: true,
      leads,
    });
  } catch (err) {
    next(err);
  }
};

export const getSuperAdminLeads = async (req, res, next) => {
  try {
    const leads = await getSuperAdminLeadsService();
    res.json({
      success: true,
      leads,
    });
  } catch (err) {
    next(err);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedLead = await updateLeadService(id, req.body);
    res.json({
      success: true,
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteLeadService(id);
    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
