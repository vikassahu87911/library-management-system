 const express = require('express');
 let {users} = require("../Data/users.json");
const router = express.Router();

 /**
 * Route: /users
 * Method: GET
 * Description: get the list of all users in the system
 * Access: Public
 * Parameters: None
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        sucess: true,
        data: users
    });
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: get a user by their id
 * Access: Public
 * Parameters: id
 */

router.get('/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((each)=>each.id === id)
    if(!user){
      return  res.status(404).json({
            success:"failure",
            message:"no user found"
        })
    }  
    res.status(200).json({
        success: true,
        data:user
        
});
});

router.post('/',(req,res)=>{
    // "id": 5,
    // "name": "Robert",
    // "surname": "Brown",
    // "email": "robert.brown@example.com",
    // "subscriptiontype": "premium",
    // "subscriptiondate": "2024-01-05"
    const{id, name, surname, email, subscriptiontype, subscriptiondate} = req.body;
    if(!id || !name || !surname || !email || !subscriptiontype || !subscriptiondate){
       return res.status(400).json({
            success:false,
            message:"please provide all the required field"
        })
    }

    const user =users.find((each)=>each.id===id)
    if(user){
        return res.status(409).json({
            success: false,
            message: "user already exists"
        })
    }

    users.push({id, name, surname, email, subscriptiontype, subscriptiondate})
    res.status(201).json({
        success: true,
        message: "user created successfully"
    })

})

router.put('/:id',(req,res)=>{
    const id = Number(req.params.id);
    const {data} = req.body;

    const user = users.find((check)=>check.id===id)

    if(!user){
        return res.status(404).json({
            success: false,
            message: `user not found for id: ${id}`
        })
    }

    const updateduser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            }
        }
        return each
    })
    users=updateduser;
    res.status(200).json({
        success: true,
        data: updateduser,
        message: "user updated successfully."
    })
})

router.delete('/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((check)=>check.id===id);
    if(!user){
        res.status(404).json({
            success:false,
            messgae:"user not found"
        })
    }
    const updateduser = users.filter((check)=>check.id!==id);
    res.status(200).json({
        success:true,
        data: updateduser,
        message:"user deleted successfully"
    })
    users=updateduser;
})

module.exports = router;
