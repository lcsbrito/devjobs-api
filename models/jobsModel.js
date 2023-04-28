const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: "",
  },
  apply: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  logoBackground: {
    type: String,
    default: "",
  },
  requirements: {
    content: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  role: {
    content: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
});

const Jobs = mongoose.model("Jobs", JobsSchema);

module.exports = Jobs;
