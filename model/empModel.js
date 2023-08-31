const mongoose = require("mongoose");

const empModelschema = mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },

    last_name: {
      type: String,
      require: true,
    },
    department: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require: true,
    },
    hire_date: {
      type: String,
      require: true,
    },

    dob: {
      type: String,
    },

    joiningDate: {
      type: String,
    },
    salary: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employe", empModelschema);
