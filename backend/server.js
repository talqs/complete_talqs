// // Description: Main server file for the backend, setting up Express, MongoDB, and routes.
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
// const historyRoutes = require('./routes/historyRoutes');
// const cors = require('cors');
// const axios = require('axios');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust to match your frontend dev server
//   credentials: true
// }));
// app.use(express.json());

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok' });
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/history', historyRoutes);

// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Name, email, and message are required' 
//       });
//     }

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.verify();

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: `New Contact Form Message from ${name}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
//             New Contact Form Submission
//           </h2>
//           <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
//           </div>
//           <div>
//             <h3 style="color: #333;">Message:</h3>
//             <div style="background-color: #fff; padding: 15px; border-left: 4px solid #4CAF50;">
//               ${message.replace(/\n/g, '<br>')}
//             </div>
//           </div>
//           <hr style="margin: 30px 0;">
//           <p style="color: #666; font-size: 12px;">
//             <em>This message was sent from your TALQS website contact form on ${new Date().toLocaleString()}</em>
//           </p>
//         </div>
//       `
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ 
//       success: true, 
//       message: 'Email sent successfully!' 
//     });
//   } catch (error) {
//     console.error('Email sending error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Failed to send email. Please try again later.' 
//     });
//   }
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
//   })
//   .catch((err) => console.error('MongoDB connection failed:', err.message));




// Description: Main server file for the backend, setting up Express, MongoDB, and routes.
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer'); // Add this import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to match your frontend dev server
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] // Add this for better compatibility
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);



// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Fixed contact endpoint with proper error handling
app.post('/api/contact', async (req, res) => {
  console.log('Contact endpoint hit');
  console.log('Request body:', req.body);
  
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials missing');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured'
      });
    }

    // Create transporter with Gmail settings[4]
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be your App Password
      },
    });

    // Verify transporter[4]
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully');
    } catch (verifyError) {
      console.error('Email verification failed:', verifyError);
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error'
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>
          <div>
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #4CAF50;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            <em>This message was sent from your TALQS website contact form on ${new Date().toLocaleString()}</em>
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    console.error('Detailed email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📧 Email service configured for: ${process.env.EMAIL_USER}`);
    });
  })
  .catch((err) => console.error('MongoDB connection failed:', err.message));