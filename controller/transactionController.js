const User = require('../models/User');
const sendMail = require('../utils/mailer');

// User submits transaction ID for club membership
exports.submitTransactionId = async (req, res) => {
  const { transactionId, immediateAccess, immediateReject, email: submittedEmail } = req.body;
  try {
    const user = req.user; // Already set by protect middleware
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log('Request body:', req.body);
    console.log('User before update:', user);
    if (submittedEmail) {
      console.log('Email submitted in body (for reference only):', submittedEmail);
    }

    user.transactionId = transactionId;
    if (immediateAccess) {
      user.isClub = true;
    }
    if (immediateReject) {
      user.isClub = false;
      // Optionally, send rejection email here
      await sendMail(
        user.email,
        'Club Membership Rejected',
        'We are sorry to inform you that your club membership request has been rejected. Because your transaction ID is not valid.'
      );
    }
    await user.save();
    console.log('User after update/save:', user);

    if (immediateAccess) {
      res.json({ message: 'Transaction ID submitted. You now have access to premium content.' });
    } else if (immediateReject) {
      res.json({ message: 'Transaction ID submitted. Your request has been rejected.' });
    } else {
      res.json({ message: 'Transaction ID submitted. Awaiting admin approval.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve club member
exports.approveClubMember = async (req, res) => {
  const { transactionId } = req.body;
  try {
    const user = await User.findOne({ transactionId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isClub = true;
    await user.save();

    // Send approval email
    await sendMail(
      user.email,
      'Club Membership Approved',
      'Congratulations! Your club membership has been approved. Welcome to the premium club!'
    );

    res.json({ message: 'User approved as club member', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject club member
exports.rejectClubMember = async (req, res) => {
  const { transactionId } = req.body;
  try {
    const user = await User.findOne({ transactionId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isClub = false;
    await user.save();

    // Send rejection email
    await sendMail(
      user.email,
      'Club Membership Rejected',
      'We are sorry to inform you that your club membership request has been rejected. Please contact support for more information.'
    );

    res.json({ message: 'User rejected as club member', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users with their transaction IDs and club status (only those who submitted a transaction)
exports.getAllClubTransactions = async (req, res) => {
  try {
    const users = await User.find(
      { transactionId: { $nin: [null, ""] } }, // Only users who have submitted a transaction
      'firstName lastName email transactionId isClub'
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 