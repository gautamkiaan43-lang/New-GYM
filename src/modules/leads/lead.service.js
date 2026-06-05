import { pool } from "../../config/db.js";

/**
 * Add a new lead
 */
export const addLeadService = async (data) => {
  const { adminId, branchId, fullName, email, phone, gender, source = "Walk-in", status = "New", notes, followUpDate, assignedToStaffId } = data;

  if (!adminId || !fullName || !phone) {
    throw { status: 400, message: "adminId, fullName, and phone are required" };
  }

  const [result] = await pool.query(
    `INSERT INTO leads (adminId, branchId, fullName, email, phone, gender, source, status, assignedToStaffId, notes, followUpDate, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [adminId, branchId || null, fullName, email || null, phone, gender || null, source, status, assignedToStaffId || null, notes || null, followUpDate || null]
  );

  return {
    id: result.insertId,
    adminId,
    fullName,
    email,
    phone,
    gender,
    source,
    status,
    notes,
  };
};

/**
 * Get all leads for a specific admin (gym owner)
 */
export const getAllLeadsService = async (adminId) => {
  const [rows] = await pool.query(
    `SELECT * FROM leads WHERE adminId = ? ORDER BY createdAt DESC`,
    [adminId]
  );
  return rows;
};

/**
 * Get all leads for superadmin (global CRM)
 */
export const getSuperAdminLeadsService = async () => {
  const [rows] = await pool.query(
    `SELECT leads.*, user.fullName as adminName, user.gymName as gymName, branch.name as branchName 
     FROM leads 
     LEFT JOIN user ON leads.adminId = user.id 
     LEFT JOIN branch ON leads.branchId = branch.id
     ORDER BY leads.createdAt DESC`
  );
  return rows;
};

/**
 * Update a lead (status, notes, etc.)
 */
export const updateLeadService = async (id, data) => {
  const { status, notes, fullName, email, phone, gender, followUpDate, source, assignedToStaffId } = data;

  // Fetch existing
  const [[existing]] = await pool.query("SELECT * FROM leads WHERE id = ?", [id]);
  if (!existing) {
    throw { status: 404, message: "Lead not found" };
  }

  await pool.query(
    `UPDATE leads SET 
      fullName = COALESCE(?, fullName),
      email = COALESCE(?, email),
      phone = COALESCE(?, phone),
      gender = COALESCE(?, gender),
      source = COALESCE(?, source),
      status = COALESCE(?, status),
      assignedToStaffId = COALESCE(?, assignedToStaffId),
      notes = COALESCE(?, notes),
      followUpDate = COALESCE(?, followUpDate),
      updatedAt = NOW()
     WHERE id = ?`,
    [
      fullName !== undefined ? fullName : null, 
      email !== undefined ? email : null, 
      phone !== undefined ? phone : null, 
      gender !== undefined ? gender : null, 
      source !== undefined ? source : null, 
      status !== undefined ? status : null, 
      assignedToStaffId !== undefined ? (assignedToStaffId || null) : existing.assignedToStaffId, 
      notes !== undefined ? notes : null, 
      followUpDate !== undefined ? (followUpDate || null) : existing.followUpDate, 
      id
    ]
  );

  const [[updatedLead]] = await pool.query("SELECT * FROM leads WHERE id = ?", [id]);
  return updatedLead;
};

/**
 * Delete a lead
 */
export const deleteLeadService = async (id) => {
  const [result] = await pool.query("DELETE FROM leads WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    throw { status: 404, message: "Lead not found" };
  }
  return true;
};
