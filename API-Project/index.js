const express = require("express");

//Database
const database = require("./database");

//INITILIZE EXPRESS
const booky = express();

/*
Route           /
Description     Get all the books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/", (req, res) => {
    return res.json({Books: database.Books})
})

/*
Route           /is
Description     Get specific books on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET
*/

booky.get("/is/:isbn", (req, res) => {
    const getSpecificBooks = database.Books.filter(
        (book) => book.ISBN === req.params.isbn
    );
    
    if(getSpecificBooks.length === 0) {
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}`})
    }

    return res.json({book: getSpecificBooks})
});

/*
Route           /c
Description     Get specific books on category
Access          PUBLIC
Parameter       category
Methods         GET
*/

booky.get("/c/:category", (req, res) => {
    const getSpecificBooks = database.Books.filter(
        (book) => book.category.includes(req.params.category)
    )

    if(getSpecificBooks.length === 0) {
        return res.json({ error: `No book found for the category of ${req.params.category}`})
    }

    return res.json({book: getSpecificBooks})
})

/*
Route           /l
Description     Get specific books on language
Access          PUBLIC
Parameter       language
Methods         GET
*/

booky.get("/L/:Language", (req, res) => {
    const getSpecificBooks = database.Books.filter(
        (book) => book.language === req.params.Language   
    )

    if(getSpecificBooks.length === 0) {
        return res.json({ error: `No book found for the language of ${req.params.Language}`})
    }

    return res.json({book: getSpecificBooks})
})

/*
Route           /author
Description     Get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/author", (req, res) => {
    return res.json({Authors: database.Authors})
})

/*
Route           /author/id
Description     Get specific authors based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/

booky.get("/author/:id", (req, res) => {
    const getSpecificAuthors = database.Authors.filter(
        (author) => author.id === parseInt(req.params.id)
    )

    if(getSpecificAuthors.length === 0) {
        return res.json({ error: `No author forunf for the id of ${req.params.id}`})
    }

    return res.json({author: getSpecificAuthors})
})

booky.listen(3000, () => {
    console.log("Server is up and running");
});
