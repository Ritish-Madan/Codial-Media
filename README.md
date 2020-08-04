# Social-Media
Building the Social Media Website in NodeJS as a part of learning. 

**Getting the dependencies**
The proper JSON file has been maintained for easy sharing of files and the dependencies used in the project with the version used in the project. 
In order to install all the dependencies just run `npm install` in the terminal and you are good to go, all the dependencies will be installed in a single command in the form of **npm package**. 

Package name :- **package.json**


**DataBase used:-**
MongoDB has been used in this project, you can download the MongoDB for free from the MongoDB official website **https://www.mongodb.com/try**.
In this project, we have connected the MongoDB with mongoose, for easy operations. Mongoose is present as dependencies in **package.json** file.

**Easy to use server command**

We have used the **nodemon** in the project for easy editings and restart of server. The nodemon has already been linked to the **index.js** to run the server easily with a single command. just type `npm run server` in the terminal and the server will be started. Still if you wish not to use the nodemon. You can also start the server with `node ./index.js` and you will be good to go. Each time you make the changes in the server, or JS file you will need to restart the server if you use `node ./index.js`. You can automate the restart with the use of nodemon by using `npm run server`.
<<<<<<< HEAD


**Features present as of now :-**

1. Create Account
2. Session Creation and storing the session into database for 60 minutes.
3. Session Security (Serialized user session cookies with passport)
4. Create posts
5. Create Comments
6. Secured session includes privilages for comments and posts. Yet they are global, updating the friends feature super soon.
7. Relational DataBases.


**Note:- The styles have not been added in this version yet. Will be updating the same with cool styles and animations super soon**
=======
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
