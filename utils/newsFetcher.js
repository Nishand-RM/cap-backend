// backend/utils/newsFetcher.js

const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const categories = ['politics', 'sports', 'technology', 'business', 'health', 'entertainment'];

const fetchNews = async () => {
  try {
    const allArticles = [];

    for (const category of categories) {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            country: 'us',
            category: category,
            apiKey: process.env.NEWS_API_KEY,
          },
        });

        if (response.data.status !== 'ok') {
          console.error(`Error fetching news for category ${category}:`, response.data);
          continue;
        }

        const articles = response.data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          category: category, // Assign the category explicitly
          source: article.source.name,
          url: article.url,
          publishedAt: article.publishedAt,
        }));

        allArticles.push(...articles);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error(
            `HTTP Error fetching news for category ${category}:`,
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // No response received
          console.error(`No response received for category ${category}:`, error.request);
        } else {
          // Error setting up the request
          console.error(`Error setting up request for category ${category}:`, error.message);
        }
        continue;
      }
    }

    return allArticles;
  } catch (error) {
    console.error('Unexpected error in fetchNews:', error);
    throw error;
  }
};

module.exports = fetchNews;
