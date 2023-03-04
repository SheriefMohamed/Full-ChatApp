const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../utils/errorHandler');
const catchMiddleware = require('../middlewares/catchMiddleware');

exports.register = catchMiddleware(async (req, res, next) => {
    const { username, email, password } = req.body;

    const userWithUsername = await User.findOne({ username : username});
    if(userWithUsername) return next(new ErrorHandler('username already used', 400));

    const userWithEmail = await User.findOne({ email : email});
    if(userWithEmail) return next(new ErrorHandler('email already used', 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username,
        email,
        password : hashedPassword
    })
    return res.status(200).json({
        status: true,
        user
    })
})

exports.login = catchMiddleware(async (req, res, next) => {
    const { username, password } = req.body;

    let user = await User.findOne({ username : username}).select("+password");
    if(!user) return next(new ErrorHandler('Incorrect username or password', 400));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return next(new ErrorHandler('Incorrect username or password', 400));

    return res.status(200).json({
        status: true,
        user
    })
})

exports.setAvatar = catchMiddleware(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        isAvatarImageSet: true,
        avatarImage : req.body.image
    });

    return res.json({
        isSet : user.isAvatarImageSet,
        image: user.avatarImage
    })
})

exports.getAllUsers = catchMiddleware(async (req, res, next) => {
    const users = await User.find({
        _id : {$ne:req.params.id}
    }).select({
        __v: 0,
        isAvatarImageSet: 0
    });

    return res.json(users);
})