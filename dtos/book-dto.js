// data transfer object

class IssuedBook{
    _id;
    name;
    author;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user){
        this._id = user.issuedbook._id;
        this.name = user.issuedbook.name;
        this.author = user.issuedbook.author;
        this.genre = user.issuedbook.genre;
        this.price = user.issuedbook.price;
        this.publisher = user.issuedbook.publisher;
        this.issuedBy = user.name;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}