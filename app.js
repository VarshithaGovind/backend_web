const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db');
connectDB();

// ✅ More permissive CORS for development/testing
const corsOptions = {
  origin: function (origin, callback) {
    // In development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // In production, be more restrictive
    if (!origin) return callback(null, true);
    
    const allowedPatterns = [
      /^https:\/\/.*\.vercel\.app$/,      // Any Vercel domain
      /^https:\/\/.*\.netlify\.app$/,     // Netlify domains
      /^http:\/\/localhost:\d+$/,         // Any localhost port
      /^https:\/\/localhost:\d+$/,        // Any localhost HTTPS port
    ];
    
    const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('🚫 Blocked origin:', origin);
      callback(null, false); // Don't throw error, just deny
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Additional CORS headers for extra compatibility
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow Vercel domains
  if (origin && origin.includes('.vercel.app')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Your routes...
const miniRouter = require('./routes/mini');
const majorRouter = require('./routes/major');
const bookingRouter = require('./routes/Booking');
const projectRoute = require('./routes/Project');
const midProjectRoutes = require('./routes/midProjectRoutes');
const userRoutes = require('./routes/UserRoute');
const uiLibraryRoutes = require('./routes/uiLibraryRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Mount routes
app.use('/api/mini-projects', miniRouter);
app.use('/api/major-projects', majorRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/projects', projectRoute);
app.use('/api/mid-projects', midProjectRoutes);
app.use('/api/users', userRoutes);
app.use(uiLibraryRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cors: 'enabled',
    env: process.env.NODE_ENV || 'development'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found',
    path: req.path,
    method: req.method,
    availableRoutes: [
      '/api/mini-projects',
      '/api/major-projects', 
      '/api/bookings',
      '/api/projects',
      '/api/mid-projects',
      '/api/users',
      '/api/transactions',
      '/health'
    ]
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
  }
  
  res.status(err.status || 500).json({ 
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔒 CORS: Dynamic origin matching enabled`);

});

module.exports = app;
