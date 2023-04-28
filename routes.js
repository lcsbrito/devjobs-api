const express = require("express");
const router = express.Router();
const jobController = require("./controllers/jobController");

// jobs routes
router.get("/search/jobs", jobController.searchJobs);
router.get("/jobs", jobController.getAllJobs);
router.post("/jobs", jobController.postJob);
router.get("/jobs/:id", jobController.getJobById);
router.put("/jobs/:id", jobController.updateJobById);
router.delete("/jobs/:id", jobController.deleteJobById);

module.exports = router;
