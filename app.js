const axios = require('axios');

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://PershantDB:password@123@cluster0.cfsfh.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let users;
let posts;
let comments;

const fetchData = async () => {
    try {
      const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
      users = userResponse.data;
      const postResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
      posts = postResponse.data;
      const commentResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
      comments = commentResponse.data;
      run();
    } catch (error) {
      console.error(error)
    }
  }

async function run() {
    try {
      await client.connect();
      const database = client.db("Assignment");
      const usersCollection = database.collection("users");
      const postsCollection = database.collection("posts");
      const commentsCollection = database.collection("comments");

      // this option prevents additional documents from being inserted if one fails
      const options = { ordered: true };
      await usersCollection.insertMany(users, options);
      await postsCollection.insertMany(posts, options);
      await commentsCollection.insertMany(comments, options);
    } finally {
      await client.close();
    }
  }
  
  fetchData();