const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

// Serve static files from current folder
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`HTML server running at http://localhost:${PORT}`);
});
