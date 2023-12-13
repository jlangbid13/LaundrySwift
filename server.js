const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const argon2 = require('argon2');
const dotenv = require('dotenv');
const path = require('path');

const scheduleRoutes = require('./routes/scheduleRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).exec();
        if (user) {
            const passwordMatch = await argon2.verify(user.password, password);
            if (passwordMatch) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email }).exec();
        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const hashedPassword = await argon2.hash(password);
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });
            await user.save();
            res.send({ message: "Successfully Registered" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error" });
    }
});

app.use(express.static(path.join(__dirname, "./frontend/build")))

// Schedule routes
app.use('/api/schedule', scheduleRoutes);



  app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
  })

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
