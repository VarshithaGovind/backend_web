const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Set up CORS to allow Vercel frontend
const corsOptions = {
  origin: 'https://demo-nu-lovat.vercel.app', // your Vercel frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions)); // ⬅️ Apply CORS options

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

// 404 and Error Handlers
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
