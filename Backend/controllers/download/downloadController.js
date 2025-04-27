const path = require("path");
const fs = require("fs");

exports.downloadResource = (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).json({ error: "No file path provided" });
  }

  const baseDir = path.join(__dirname, "..", "data", "resources");
  const fullPath = path.resolve(baseDir, filePath);

  // console.log("Full path:", fullPath); // Debugging line
  // console.log("Base directory:", baseDir); // Debugging line

  // Check that fullPath is inside baseDir
  if (!fullPath.startsWith(baseDir)) {
    return res.status(400).json({ error: "Invalid file path" });
  }

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(fullPath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("Error downloading file");
    }
  });
};
