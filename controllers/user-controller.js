const {usermodel, bookmodel} = require('../models');

exports.getAllUsers = async (req, res) => {
    const users = await usermodel.find();

    if(!users||users.length===0){
        return res.status(404).json({
            success: false,
            message: "No users found"
        })
    }
    res.status(200).json({
        success: true,
        data: users
    });
}

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usermodel.findById(id);
    // const user = await usermodel.findById({_id: id});
    // const user = await usermodel.findOne({_id: id});

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: user
    });
}

exports.createUser = async (req, res) => {
    const data = req.body;
    
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "User data is required"
        })
    }
    const newUser = await usermodel.create(data);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
}


exports.updateuserbyid = async (req, res) => {
    const id = req.params.id;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "User data is required for update"
        })
    }

    const user = await usermodel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        })
    }

    const updatedUser = await usermodel.findByIdAndUpdate(id, data, { new: true });


    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully"
    });
}

exports.deleteUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usermodel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        })
    }

    await usermodel.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
}

exports.getsubscriptiondetails = async (req, res) => {
    const id = req.params.id;
    const user = await usermodel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        })
    }

    // extract subscription details from user object

    const getdateindays = (data)=>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date();
        }
        let days = Math.floor(date/ (1000*60*24));
        return days;

    }

    const subscriptiontype = (date)=>{
        if(user.subscriptiontype === "basic"){
            date = date + 90
        
        }else if(user.subscriptiontype==="premium"){
            date = date + 365;
        }
        return date;
    }

      let returndate = getdateindays(user.returndate);
    let currentdate = getdateindays();
    let subscriptiondate = getdateindays(user.subscriptiondate);
    let subscriptionexpiration = subscriptiontype(subscriptiondate);


    const data = {
        ...user,
        subscriptionexpired: subscriptionexpiration < currentdate,
        subscriptiondaysleft: subscriptionexpiration - currentdate,
        daysleftforexpiration: returndate - currentdate,
        returndate: returndate < currentdate ? "book is overdue " : returndate,
        fine: returndate < currentdate ? subscriptionexpiration <= currentdate ? 200 :100 :0
    }

    res.status(200).json({
        success: true,
        data: data
    });

}