const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// console.log(process.env.SUPABASE_URL);
// console.log(process.env.SUPABASE_SERVICE_KEY);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase credentials are missing");
}

const storage = multer.memoryStorage(); // Memory storage stores file in buffer

// Initialize Multer with memory storage
const upload = multer({ storage: storage });

module.exports = upload;
