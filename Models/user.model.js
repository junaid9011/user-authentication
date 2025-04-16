const {Schema,mongoose} = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        maxLength:[30,'Your name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minLength:[6,'Your password must be longer than 6 characters'],
        select:false
    },
    phone:{
        type:String,
        minLength:[11,'Your phone number cannot exceed 11 characters']
    },
    role:{
        type:String,
        default:'user'
    },
   
}, {
    timestamps: true
})
// Encrypting password before save
userSchema.pre('save', async function (next) {// here can't use arrow functions
    if (!this.isModified('password')) {
        next();
    }// this if block check if the password is modified or not if not it doesn't encrypt again
    this.password = await bcrypt.hash(this.password, 10);
})
//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
//Return JWT Token

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}
// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // hash and reset token
    this.resetPsswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    //set token expire time
    this.resetPsswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}
module.exports = mongoose.model('user', userSchema)