const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dgrnbapwr', 
  api_key: '249116354455991',
  api_secret: '-RSp_WFJOGjNbJQGW-tQquOPsWc'
});

// Set up Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
app.use(express.json());

// Endpoint to upload images to Cloudinary
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream({ folder: 'portfolio' }, (error, result) => {
      if (error) {
        return res.status(500).send('Error uploading image to Cloudinary');
      }
      res.status(200).json({ imageUrl: result.secure_url });
    });

    // Pipe the file buffer to the Cloudinary uploader
    req.file.stream.pipe(uploadResult);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
