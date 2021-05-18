# node-demo
Steps to run this project:

To Install run:
npm install 

To run using nodemon:
npm run dev

Here I have Dump DB so you can use it:
Dump20210518.sql

Routes:

To create user:

URL: http://localhost:3000/api/user/create
Method: POST
Body : {"name":"user_test","address":"Delhi"}

TO update role of user_admin as "admin"
URL: http://localhost:3000/api/admin/update-role/user_admin
Method: PATCH
here "user_admin" is username

TO sync user list and saved in user json file
URL: http://localhost:3000/api/admin/sync-user-list/user_admin
Method: GET
here "user_admin" is username

To check if username exist in json file
URL: http://localhost:3000/api/user/get-my-purchases/user_naveen
Method: GET
Here "user_naveen" is the username

For environment file:
Please check .env.example for understanding
Please create exact same with as .env
