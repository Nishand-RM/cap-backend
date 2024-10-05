POSTMAN ENDPOINTS:


https://cap-backend-project.onrender.com


1. creating users prefernece in news 
https://cap-backend-project.onrender.com/api/users (POST)

{
  "email": "ji@example.com",
  "preferences": {
    "categories": ["politics", "sports"],
    "frequency": "daily",
    "notificationTypes": ["email"]
  }
}
------------------------------------------------------------------------------------

2. update user information through user id

https://cap-backend-project.onrender.com/api/users/:id (PUT)

--------------------------------------------------------------------------------------
3.fetching user details

https://cap-backend-project.onrender.com/api/users (GET)

--------------------------------------------------------------------------------------

4.fetching news from news.api

https://cap-backend-project.onrender.com/api/news (GET)

--------------------------------------------------------------------------------------

5.manually triggering for notification - for all users

https://cap-backend-project.onrender.com/api/news/alerts (POST)

--------------------------------------------------------------------------------------

6. manually trigerring notification for particular user  

https://cap-backend-project.onrender.com/api/news/notifications?email=vinay@gmail.com (GET)

-----------------------------------------------------------------------------------------------------

1.In this Project, In UI give the mail-id and prefernce of news category and the data will be stored in the Mongodb (Users--collection) 
and also tried in postman and stored the data in mongodb

2.And the news fethed from News.api and displayed in UI (but in news.api only limited request is allowed in a day)

3. Then manually triggering the notification, once it is triggered it store the notification details in Mongodb (Notification -- collection) 
and gets updated in Notification History in the UI.