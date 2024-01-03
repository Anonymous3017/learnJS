const Books = [
    {
        ISBN: "12345Book",
        title: "Tesla!!!",
        pubDate: "2021-08-05",
        language: "en",
        numPage: "250",
        author: [1,2],
        publication: [1],
        category: ["tech","space","education"]
    },
    {
        ISBN: "secretBook",
        title: "Secret Book",
        pubDate: "2021-08-05",
        language: "hin",
        numPage: "250",
        author: [1],
        publication: [1],
        category: ["tech","space","education","secrets"]
    } 
]

const Authors = [
    {
        id: 1,
        name: "Aradhan",
        books: ["12345Book","secretBook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    }
]

const Publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"]
    },
    {
        id: 2,
        name: "writex2",
        books: ["Harry Potter"]
    }
]

module.exports = {Books,Authors,Publications};
