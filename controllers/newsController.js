// backend/controllers/newsController.js

const User = require('../models/User');
const fetchNews = require('../utils/newsFetcher');
const sendEmail = require('../utils/emailService');
const cron = require('node-cron');
const Notification = require('../models/Notification'); // Import Notification model

// Helper function to send alerts to a group of users
const sendAlertsForGroup = async (users, frequency) => {
  try {
    const latestNews = await fetchNews();

    for (const user of users) {
      const { categories, notificationTypes } = user.preferences;

      // Filter news based on user's preferred categories
      const filteredNews = latestNews.filter((article) =>
        categories.includes(article.category.toLowerCase())
      );

      if (filteredNews.length === 0) continue; // Skip if no relevant news

      const subject = `Your ${frequency.charAt(0).toUpperCase() + frequency.slice(1)} News Alerts`;
      const htmlContent = `
        <h1>Here are your latest ${categories.join(', ')} news updates:</h1>
        <ul>
          ${filteredNews
            .map(
              (article) => `
            <li>
              <h2>${article.title}</h2>
              <p>${article.description || 'No description available.'}</p>
              <a href="${article.url}">Read more</a>
            </li>
          `
            )
            .join('')}
        </ul>
      `;

      if (notificationTypes.includes('email')) {
        try {
          await sendEmail(user.email, subject, htmlContent);
          console.log(`✅ Email sent to ${user.email}`);

          // Create a Notification entry
          const notification = new Notification({
            userEmail: user.email,
            title: subject,
            description: `You have received ${filteredNews.length} new articles in the categories: ${categories.join(
              ', '
            )}.`,
            category: categories.join(', '),
            url: '', // Optional: You can set a URL if needed
          });

          await notification.save();
          console.log(`✅ Notification saved for ${user.email}`);
        } catch (emailError) {
          console.error(`❌ Failed to send email to ${user.email}:`, emailError);
        }
      }

      // Implement other notification types here (SMS, push)
    }
  } catch (error) {
    console.error(`Error in sendAlertsForGroup (${frequency}):`, error);
  }
};

// Function to schedule alerts based on frequency
exports.scheduleAlerts = () => {
  // Immediate alerts: every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    console.log('🔄 Sending immediate alerts...');
    const immediateUsers = await User.find({ 'preferences.frequency': 'immediate' });
    await sendAlertsForGroup(immediateUsers, 'immediate');
  });

  // Hourly alerts: at the start of every hour
  cron.schedule('0 * * * *', async () => {
    console.log('🔄 Sending hourly alerts...');
    const hourlyUsers = await User.find({ 'preferences.frequency': 'hourly' });
    await sendAlertsForGroup(hourlyUsers, 'hourly');
  });

  // Daily alerts: at midnight every day
  cron.schedule('0 0 * * *', async () => {
    console.log('🔄 Sending daily alerts...');
    const dailyUsers = await User.find({ 'preferences.frequency': 'daily' });
    await sendAlertsForGroup(dailyUsers, 'daily');
  });

  console.log('🕒 Alert scheduling initialized.');
};

// Endpoint to manually trigger sending alerts (optional)
exports.manualSendAlerts = async (req, res) => {
  try {
    await sendAlertsForGroup(await User.find(), 'manual');
    res.status(200).json({ message: 'Manual alerts sent successfully.' });
  } catch (error) {
    console.error('Error sending manual alerts:', error);
    res.status(500).json({ message: 'Failed to send manual alerts.' });
  }
};

// Fetch latest news and return to frontend
exports.getNews = async (req, res) => {
  try {
    const news = await fetchNews();
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Failed to fetch news.' });
  }
};





// backend/controllers/newsController.js

exports.getNotifications = async (req, res) => {
  try {
    let { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required.' });
    }

    email = email.toLowerCase(); // Convert to lowercase

    const notifications = await Notification.find({ userEmail: email }).sort({ sentAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications.' });
  }
};



