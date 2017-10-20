// requiring mongoose again
const mongoose = require('mongoose')
const Schema = mongoose.Schema // constructor for all schema

// UPDATE 20 Oct
// requiring bcrypt
const bcrypt = require('bcrypt')

// setting the blueprint of User object
const adminSchema = new Schema({
  name: String,
  email: String,
  password: String,
})

// UPDATE 20 Oct, before we save the password, we hash it
// and save the hash instead
adminSchema.pre('save', function(next) {
  var admin = this
  // no need slug admin
  // user.slug = user.name.toLowerCase().split(' ').join('-')

  // logic to create hash
  // Only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) return next();

  //hash the password
  bcrypt.hash(admin.password, 10)
  .then(hash => { // the then method here is when we got the hash
    // UPDATE 20 OCT
    // call the next() when the password is hashed
    admin.password = hash
    // console.log('pre save flow', user)
    next() // next() is calling the save()
  })
})

// active the blueprint
// registering the name of the database that we're connecting to
const Admin = mongoose.model('Admin', adminSchema)
// look for users collection in mDb
// we can name the object differently as to the DB registry

// need to export this
module.exports = Admin
