const express = require('express');
// let {books} = require("../Data/books.json");
// let {users} = require("../Data/users.json");

const {usermodel, bookmodel} = require('../models');
const { getAllbooks, getsinglebookbyid, getAllIssuedBooks,addNewBook,updateBookById,deleteBookById} = require('../controllers/book-controller');

const router = express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         sucess: true,
//         data: books
//     });
// })

router.get('/', getAllbooks)

// router.get('/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const book = books.find((each)=>each.id === id)
//     if(!book){
//       return  res.status(404).json({
//             success:"failure",
//             message:"book not found"
//         })
//     }  
//     res.status(200).json({
//         success: true,
//         data:book
        
// });
// });

router.get('/:id',getsinglebookbyid);

// router.post('/',(req,res)=>{
//     // "id": 3,
//     // "name": "Rich Dad Poor Dad",
//     // "author": "Robert Kiyosaki",
//     // "genre": "Finance",
//     // "price": 350,
//     // "publisher": "Plata Publishing"
//     const{id, name, author, genre, price, publisher} = req.body;
//     if(!id || !name || !author || !genre || !price || !publisher){
//        return res.status(400).json({
//             success:false,
//             message:"please provide all the required field"
//         })
//     }

//     const book =books.find((each)=>each.id===id)
//     if(book){
//         return res.status(409).json({
//             success: false,
//             message: "book already exists for the given id"
//         })
//     }

//     books.push({id, name, author, genre, price, publisher})
//     res.status(201).json({
//         success: true,
//         message: "book created successfully"
//     })

// })

router.post('/',addNewBook);

// router.put('/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const {data} = req.body;

//     const book = books.find((check)=>check.id===id)

//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `book not found for id: ${id}`
//         })
//     }

//     const updatedbooks = books.map((each)=>{
//         if(each.id===id){
//             return {
//                 ...each,
//                 ...data
//             }
//         }
//         return each
//     })
//     books=updatedbooks;
//     res.status(200).json({
//         success: true,
//         data: updatedbooks,
//         message: "book updated successfully."
//     })
// })

router.put('/:id',updateBookById);

// router.delete('/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const book = books.find((check)=>check.id===id);
//     if(!book){
//         res.status(404).json({
//             success:false,
//             messgae:"book not found"
//         })
//     }
//     const updatedbooks = books.filter((check)=>check.id!==id);
//     res.status(200).json({
//         success:true,
//         data: updatedbooks,
//         message:"book deleted successfully"
//     })
//     books=updatedbooks;
// })


// router.get('/issued/list',(req,res)=>{
//     const userswithbook = users.filter((each)=>{
//         if(each.issuedbook){
//             return each;
//         }
        
//     });
    
//     const issuedbooks=[];

//     userswithbook.forEach((each)=>{
//         const book = books.find((book)=>book.id===each.issuedbook);

//         book.issuedby = each.name;
//         book.issueddate = each.issueddate;
//         book.returndate = each.returndate;

//         issuedbooks.push(book);
//     })

//     if(!issuedbooks){
//         return res.status(404).json({
//             success:false,
//             message:"no book issued yet"
//         })
//     }

//     res.status(200).json({
//         success:true,
//         data: issuedbooks
//     })

// })

router.delete('/:id',deleteBookById)

router.get('/issued/list', getAllIssuedBooks);

module.exports = router;