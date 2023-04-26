// const mongoose = require('mongoose');

// // Connect to the MongoDB database
// mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('Error connecting to MongoDB:', error));

// // Define a schema for a "users" collection
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

// // Define a model for the "users" collection
// const User = mongoose.model('User', userSchema);

// // Create a new user and save it to the database
// const newUser = new User({
//   name: 'John Doe',
//   email: 'johndoe@example.com'
// });
// newUser.save((error) => {
//   if (error) throw error;
//   console.log('User saved successfully');
// });

// // Find all users in the database
// User.find({}, (error, users) => {
//   if (error) throw error;
//   console.log('All users:', users);
// });

// // Close the connection to the database
// mongoose.connection.close();