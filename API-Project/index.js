const express = require("express");
var bodyParser =  require("body-parser")

//Database
const database = require("./database");

//INITILIZE EXPRESS
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
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

/*
Route           /author/book
Description     Get specific authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthors = database.Authors.filter(
        (author) => author.books.includes(req.params.isbn)
    )

    if(getSpecificAuthors.length === 0) {
        return res.json({ error: `No author forunf for the book of ${req.params.isbn}`})
    }

    return res.json({ author: getSpecificAuthors})
})

/*
Route           /publications
Description     Get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/publications", (req, res) => {
    return res.json({ publications: database.Publications })
    
})

/*
Route           /publications/id
Description     Get specific publications based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/

booky.get("/publications/:id", (req, res) => {
    const getSpecificPublications = database.Publications.filter(
        (publication) => publication.id === parseInt(req.params.id)
    )

    if(getSpecificPublications.length === 0) {
        return res.json({ error: `No publication forunf for the id of ${req.params.id}`})
    }

    return res.json({publication: getSpecificPublications})
})

/*
Route           /publications/book
Description     Get specific publications based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

booky.get("/publications/book/:isbn", (req, res) => {
    const getSpecificPublications = database.Publications.filter(
        (publication) => publication.books.includes(req.params.isbn)
    )

    if(getSpecificPublications.length === 0) {
        return res.json({ error: `No publication forunf for the book of ${req.params.isbn}`})
    }

    return res.json({ publication: getSpecificPublications})
})

//POST

/*
Route           /book/add
Description     Add new books
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/book/add", (req, res) => {
    const newBook = req.body;
    database.Books.push(newBook);
    return res.json({updatedBooks: database.Books})
})

/*
Route           /author/add
Description     Add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/author/add", (req, res) => {  
    const newAuthor = req.body;
    database.Authors.push(newAuthor);
    return res.json({updatedAuthors: database.Authors})
});

/*
Route           /publication/add
Description     Add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/publication/add", (req,res) => {
    const newPublication = req.body;
    database.Publications.push(newPublication);
    return res.json({updatedPublications: database.Publications})
})

//to check if a book is present and then uodate the book suing post

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         POST
*/


// booky.post("/book/update/:isbn", (req, res) => {
//     const getSpecificBooks = database.Books.filter(
//         (book) => book.ISBN === req.params.isbn
//     );
    
//     if(getSpecificBooks.length === 0) {
//         return res.json({ error: `No book found for the ISBN of ${req.params.isbn}`})
//     }

//     // change the title of the book
//     getSpecificBooks[0].title = req.body.newBookTitle;

//     return res.json({books: getSpecificBooks})
// });


booky.post("/book/update/:isbn", (req, res) => {
    const getSpecificBooks = database.Books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBooks.length === 0) {
        return res.json({error: `No Book found with ISBN no. ${req.params.isbn}`});
    }

    getSpecificBooks[0].title =  req.body.newBookTitle;

    return res.json({books: getSpecificBooks})
});

/*
Route           /publication/update/book
Description     update/add a new publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/publicaation/update/book/:isbn", (req, res) => {
    //Update the publication database
    database.Publications.forEach((pub) => {
        if(pub.id === req.body.pubID) {
            return pub.books.push(req.params.isbn);
        }
    });

    //Update the book database
    database.Books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publication = req.body.pubID;
            return;
        }
    });

    return res.json({
        books: database.Books,
        publications: database.Publications,
        message: "Successfully Updated Publications."
    });
});

booky.listen(3000, () => {
    console.log("Server is up and running");
});
