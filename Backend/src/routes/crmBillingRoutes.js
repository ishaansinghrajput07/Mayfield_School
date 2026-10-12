const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  listEnrollments,
  listMemberships,
  createMembership,
  updateMembership,
  updateMembershipStatus,
  listFeeAssignments,
  createFeeAssignment,
  updateFeeAssignment,
  cancelFeeAssignment,
  listRenewals,
  getRenewal,
  createRenewal,
  reviewRenewal,
  completeRenewal,
  listPayments,
  createPayment,
} = require("../controllers/crmBillingController");

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/enrollments", listEnrollments);

router.route("/memberships").get(listMemberships).post(createMembership);
router.put("/memberships/:id/suspend", (req, res, next) => {
  req.params.action = "suspend";
  next();
}, updateMembershipStatus);
router.put("/memberships/:id/cancel", (req, res, next) => {
  req.params.action = "cancel";
  next();
}, updateMembershipStatus);
router.route("/memberships/:id").put(updateMembership);

router.route("/fee-assignments").get(listFeeAssignments).post(createFeeAssignment);
router.put("/fee-assignments/:id/cancel", cancelFeeAssignment);
router.route("/fee-assignments/:id").put(updateFeeAssignment);

router.route("/renewals").get(listRenewals).post(createRenewal);
router.get("/renewals/:id", getRenewal);
router.put("/renewals/:id/approve", reviewRenewal);
router.put("/renewals/:id/complete", completeRenewal);

router.route("/payments").get(listPayments).post(createPayment);

module.exports = router;
