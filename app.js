const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config()
const port = process.env.port || 5000;
app.use(express.json())

mongoose.connect(process.env.dbLink)

const Book = require("./models/Book");

app.get("/", (req, res) => {
    try {
        res.status(200).send({ msg: "Homepage" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Internal Server error" });
    }
})

// Add A book
app.post("/api/books", async (req, res) => {
    try {
        const book = new Book(req.body)
        await book.save()
        res.status(200).send({ msg: "Add Book SuccessFul", data: book })

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Internal server Error" })
    }
})

// Retrieve Books API
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(201).send(books);
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Internal server Error" })
    }
})

// Delete Book API
app.delete("/api/books/:id", async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndDelete(req.params.id);
        if (!deleteBook) {
            return res.status(404).send({ err: "Book Not Found" })
        }
        res.status(201).send({ msg: "Book Deleted" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Internal server Error" })
    }
})

// Filter Books API
app.get("/api/books/filter/:genre",async(req,res)=>{
    try {
        const {genre}= req.params;
        const filterBooks= await Book.find({genre});
        res.status(201).send(filterBooks)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Internal server Error" })
    }
})

// Sort Books API
app.get("/api/books/sort/:order",async(req,res)=>{
    try {
        const {order}= req.params;
        const sortedOrder= order ==="asc"?1:order==="desc"?-1:1;
        const sortedBooks= await Book.find().sort({price:sortedOrder});
        
        res.status(201).send(sortedBooks);
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Internal server Error" })
    }
})


app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
})