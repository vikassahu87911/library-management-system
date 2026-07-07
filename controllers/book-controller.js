const {usermodel,bookmodel} = require('../models');
const bookModel = require('../models/book-model');
const userModel = require('../models/user-model');

const IssuedBook = require('../dtos/book-dto');

exports.getAllbooks = async(req,res) =>{
    const books = await bookModel.find();

    if(books.length === 0){
        return res.status.json({
            success: false,
            message:"no boooks in the system"
        })
    }

    res.status(200).json({
        success:true,
        data:books
    })
}

exports.getsinglebookbyid = async(req,res) =>{
    const id = req.params.id;
    const book = await bookModel.findById(id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for the ID: ${id}`
        })
    }

    res.status(200).json({
        success:true,
        data:book
    })

}

exports.getAllIssuedBooks = async(req,res)=>{
    const users = await userModel.find({
        issuedbook: {$exists: true},
        
}).populate("issuedbook")

const issuedBooks = users.map((each) => {
    return new IssuedBook(each);
});

if(issuedBooks.length === 0) {
    return res.status(404).json({
        success: false,
        message: "No issued books found in the system."
    });
}
res.status(200).json({
    success: true,
    data: issuedBooks
});

};

exports.addNewBook = async(req,res)=>{
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide valid book data."
        });
    }

    await bookModel.create(data);
    // res.status(201).json({
    //     success: true,
    //     message: "Book added successfully.",
    //     data: data
    // });

    const allbooks = await bookModel.find();
    res.status(201).json({
        success: true,
        message: "Book added successfully.",
        data: allbooks
    });

}

exports.updateBookById = async(req,res)=>{
    const id = req.params.id;
    const {data} = req.body;

    const updatedBook = await bookModel.findByIdAndUpdate(
        id, 
        data, 
        {new: true}
    );
    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book not found for the ID: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: updatedBook
    })
}

exports.deleteBookById = async(req,res)=>{
    const id = req.params.id;
    //check if the book exists
    const book = await bookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for the ID: ${id}`
        })
    }
    await bookModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully."
    })
}


// module.exports = {
//     getAllbooks, getsinglebookbyid
// }