// const fileUpload = require('express-fileupload');


// Define a route for uploading images
const uploadFile = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Access the uploaded file using req.files.fileKey
  const sampleFile = req.files.sampleFile;

  // Define the path where you want to save the uploaded file
  const uploadPath = __dirname + '/uploads/' + sampleFile.name;

  // Save the file to the defined path
  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!');
  });
};

module.exports = uploadFile;
