import users from './index.js'
import { databases } from './mongo.js';
import jwt  from 'jsonwebtoken';
import User, { noway } from './user_model.js';
import bcrypt from 'bcrypt';
export const Getusers = async (req, res) => {
    const resp=databases.users.find();
    const documents = await resp.toArray();
    // Send the documents as a JSON response
    res.json(documents)

};




export const Addusers = async (req, res) => {
     
    const user = {
            name: req.body.name,
            content: req.body.content,
          }
    const result = await databases.users.insertOne(user);
    res.json({success: "OK"})
};

// Route to handle HTTP PUT requests
export const Updateusers = async (req, res) => {

    const filter = { name: req.query.oldname };
// update the value of the 'quantity' field to 5
    const updateDocument = {
    $set: {
      name: req.query.newname,
        },
    };
    const result = await databases.users.updateOne(filter, updateDocument);
    res.json({success: "OK"});
    
};

// Route to handle HTTP DELETE requests
export const Deleteusers = async (req, res) => {
    const user = {
        name:req.query.name,
      };
    const deleteResult = await databases.users.deleteOne(user);
    res.json({success: "OK"});
};


export const Logincokie =  (req, res) => {
    console.log("here");
    res.cookie('token',"this is a login",{
       maxAge:10000, 
    });
    res.json({success: "OK"});
};




export const Register = async (req, res) => {
     
    const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }
    const result = await databases.users.insertOne(user);
    res.json({success: "OK"})
};

export const Login = async (req, res) => {
    console.log(req.body.name)
    const user = {
            name: req.body.name,
            password: req.body.password,
          }
          const resp= await databases.users.findOne({"name":req.body.name});
          if (resp===null) {
              
              res.json({"error":"user not found"})
            }
            else{
                const token = jwt.sign({name:req.body.name},"shubham")
                res.cookie('token',token,{
                    maxAge:20000, 
                });
                res.sendFile()
    }
};

export const Logout = async (req, res) => {
     
   
    res.redirect("/api/login")
};

export const Adduserspostgres = async (req, res) => {
     
    const user = {
            name: req.body.name,
            content: req.body.content,
          }
    console.log(req.body.password,"4");      
    const a = await hashPassword(req.body.password)
    const result = await comparePassword(req.body.password,a);
    console.log(result);
    console.log(a,"2");
    const newuser = await User.create({ firstName: req.body.firstname ,lastName:req.body.lastname,Password:req.body.password});
    await newuser.save();
    const users = await User.findAll({
        attributes: ['firstName']
      });
    res.json({success: "OK",data: users});
};


const saltRounds = 10; // Number of salt rounds for bcrypt hashing

// Function to hash a password
const hashPassword = async (plainPassword) => {
  try {
    console.log(plainPassword);
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    console.log(hash,"1");
    return hash;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  };
  
  // Example usage:
 
  
  // Hash the password
  