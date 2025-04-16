const User=require('../Models/user.model');
const ErrorHandler=require('../Utlis/ErrorHandler');
const sendToken=require('../Utlis/sendToken');
const jwt=require('jsonwebtoken');
//sign up
exports.signup=async(req,res,next)=>{
    const {name,email,phone,password}=req.body;
    try{
        //send otp
        let user=await User.findOne({email});
        if(user){
            return next(new ErrorHandler('User already exists',400))
        }
         user=await User.create({
            name,
            email,
            phone,
            password,
        })
        const otp=Math.floor(1000+Math.random()*9000);
        user.otp=otp;
        await user.save();
        //send token
        sendToken(user,200,res)
        
    }
    catch(err){
        next(err)
    }
}
//login
exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        // console.log(req.body)
        //checking if email and password is entered by user
        if(!email||!password){
            return next(new ErrorHandler('Please enter email and password',400))
        }
        //finding user in database
        let user=await User.findOne({email}).select('+password');
        if(!user){
            return next(new ErrorHandler('Invalid email or password',401))
        }
        //check if password is correct or not
        const isPasswordMatched=await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler('Invalid email or password',401))
        }
        //send token
        sendToken(user,200,res)
        // res.status(200).json({
        //     success:true,
        //     token: user.getJwtToken()
        // })

    }
    catch(err){
        return next(new ErrorHandler(err.message,err.statusCode))
    }
}



//get currently logged in user details
exports.getUserProfile=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }
}


exports.logout=async(req,res,next)=>{
    try{
        res.cookie('refreshToken',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            message:'Logged out successfully'
        })
    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }
}

exports.refreshToken=async(req,res,next)=>{
    try{
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken){
            return next(new ErrorHandler('Please login to access this resource',401))
        }
        jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(err,user)=>{
            if(err){
                return next(new ErrorHandler('Invalid refresh token',401))
            }
            const accessToken=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME})
            res.status(200).json({
                success:true,
                accessToken
            })
        })
    }
    catch(err){
        return next(ErrorHandler(err.message,err.statusCode))
    }
}

