import {
  addHealthLogService,
  getMemberHealthLogsService,
  getAllHealthLogsService,
  updateHealthLogService,
  deleteHealthLogService,
} from "./health.service.js";

export const addHealthLog = async (req, res, next) => {
  try {
    const data = await addHealthLogService(req.body);
    res.status(201).json({
      success: true,
      message: "Health log added successfully",
      healthLog: data,
    });
  } catch (err) {
    next(err);
  }
};

export const getMemberHealthLogs = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    if (!memberId) {
      return res.status(400).json({ success: false, message: "memberId is required" });
    }
    const logs = await getMemberHealthLogsService(memberId);
    res.json({
      success: true,
      logs,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllHealthLogs = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    if (!adminId) {
      return res.status(400).json({ success: false, message: "adminId is required" });
    }
    const logs = await getAllHealthLogsService(adminId);
    res.json({
      success: true,
      logs,
    });
  } catch (err) {
    next(err);
  }
};

export const updateHealthLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateHealthLogService(id, req.body);
    res.json({
      success: true,
      message: "Health log updated successfully",
      healthLog: data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteHealthLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteHealthLogService(id);
    res.json({
      success: true,
      message: "Health log deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
