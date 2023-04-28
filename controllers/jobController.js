const Jobs = require("../models/jobsModel");

// Get all jobs with a limit of 12 per page
const getAllJobs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  try {
    const jobs = await Jobs.find()
      .sort({ postedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await Jobs.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const response = {
      jobs: jobs,
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
    };

    if (page < totalPages) {
      response.nextPage = `http://${req.headers.host}/jobs?page=${
        page + 1
      }&limit=${limit}`;
    }

    if (page > 1) {
      response.prevPage = `http://${req.headers.host}/jobs?page=${
        page - 1
      }&limit=${limit}`;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new job
const postJob = async (req, res) => {
  const job = new Jobs({
    company: req.body.company,
    position: req.body.position,
    location: req.body.location,
    contract: req.body.contract,
    description: req.body.description,
    website: req.body.website,
    apply: req.body.apply,
    logo: req.body.logo,
    logoBackground: req.body.logoBackground,
    requirements: req.body.requirements,
    role: req.body.role,
  });

  console.log(job);

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a job by ID
const updateJobById = async (req, res) => {
  try {
    const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job by ID
const deleteJobById = async (req, res) => {
  try {
    const job = await Jobs.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search for jobs by title, location, and full-time only
const searchJobs = async (req, res) => {
  const { title, location, fullTimeOnly } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const searchParams = {};

  if (title) {
    const searchRegex = new RegExp(title, "i");
    searchParams["$or"] = [
      { title: searchRegex },
      { company: searchRegex },
      { expertise: searchRegex },
    ];
  }

  if (location) {
    searchParams.location = { $regex: location, $options: "i" };
    console.log(`searchParams = ${JSON.stringify(searchParams)}`);
  }

  if (fullTimeOnly === "true") {
    searchParams.contract = "Full-Time";
    console.log(`searchParams = ${JSON.stringify(searchParams)}`);
  }

  try {
    const jobs = await Jobs.find(searchParams)
      .skip((page - 1) * limit)
      .limit(limit);
    console.log(jobs);
    const count = await Jobs.countDocuments(searchParams);
    const totalPages = Math.ceil(count / limit);

    const response = {
      jobs: jobs,
      currentPage: page,
      totalPages: totalPages,
      totalCount: count,
    };

    if (page < totalPages) {
      response.nextPage = `http://${
        req.headers.host
      }/search/jobs?q=${title}&location=${location}&page=${
        page + 1
      }&limit=${limit}`;
    }

    if (page > 1) {
      response.prevPage = `http://${
        req.headers.host
      }/search/jobs?q=${title}&location=${location}&page=${
        page - 1
      }&limit=${limit}`;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  postJob,
  updateJobById,
  deleteJobById,
  searchJobs,
};
