const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Handle EMV RQ requests
app.post("/emv-rq", (req, res) => {
  // Extract data from the request
  const { field1, field2, field3 } = req.body;

  // Process the EMV RQ data
  // Replace this with your own logic

  // Prepare the response
  const response = {
    result: "success",
    message: "EMV RQ processed successfully",
  };

  // Send the response
  res.json(response);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
