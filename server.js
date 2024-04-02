// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ebookdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MongoDB schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.json());

// User registration
app.post('/register', async(req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).send('Registration failed');
    }
});

// User login
app.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'secretKey');

        res.status(200).send({ token });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).send('Login failed');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// server.js

// Add Mongoose schema for eBooks
const EbookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
});

const Ebook = mongoose.model('Ebook', EbookSchema);

// CREATE (Add) eBook
app.post('/ebooks', async(req, res) => {
    try {
        const { title, author, category } = req.body;

        // Save eBook to the database
        const ebook = new Ebook({ title, author, category });
        await ebook.save();

        res.status(201).send('Ebook created successfully');
    } catch (error) {
        console.error('Error creating ebook:', error);
        res.status(500).send('Error creating ebook');
    }
});

// READ (Get) all eBooks
app.get('/ebooks', async(req, res) => {
    try {
        const ebooks = await Ebook.find();
        res.json(ebooks);
    } catch (error) {
        console.error('Error getting ebooks:', error);
        res.status(500).send('Error getting ebooks');
    }
});

// READ (Get) a single eBook by ID
app.get('/ebooks/:id', async(req, res) => {
    try {
        const ebook = await Ebook.findById(req.params.id);
        if (!ebook) {
            return res.status(404).send('Ebook not found');
        }
        res.json(ebook);
    } catch (error) {
        console.error('Error getting ebook by ID:', error);
        res.status(500).send('Error getting ebook by ID');
    }
});

// UPDATE (Edit) an eBook by ID
app.put('/ebooks/:id', async(req, res) => {
    try {
        const { title, author, category } = req.body;

        const updatedEbook = await Ebook.findByIdAndUpdate(
            req.params.id, { title, author, category }, { new: true }
        );

        if (!updatedEbook) {
            return res.status(404).send('Ebook not found');
        }

        res.json(updatedEbook);
    } catch (error) {
        console.error('Error updating ebook:', error);
        res.status(500).send('Error updating ebook');
    }
});

// DELETE an eBook by ID
app.delete('/ebooks/:id', async(req, res) => {
    try {
        const deletedEbook = await Ebook.findByIdAndDelete(req.params.id);
        if (!deletedEbook) {
            return res.status(404).send('Ebook not found');
        }
        res.send('Ebook deleted successfully');
    } catch (error) {
        console.error('Error deleting ebook:', error);
        res.status(500).send('Error deleting ebook');
    }
});