const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try{
    const body = req.body
    if(!body.password){
        return res.status(400).json({error: 'Password missing.'})
    }else if(body.password.length < 3){
        return res.status(400).json({error: 'Minimum length of a password is 3.'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
    const savedUser = await user.save()
    res.json(savedUser)
  }
  catch(error){
    if(error.name === 'ValidationError'){
        return res.status(400).json({
            error: error.message
        })
    }
    next(error)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try{
    const users = await User.find({}).populate('blogs')
    res.json(users.map(u => u.toJSON()))
  }
  catch(exception){
    next(exception)
  }
})

module.exports = usersRouter


