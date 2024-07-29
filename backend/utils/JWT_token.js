var jwt = require('jsonwebtoken');


const generateJWT_Token =  async( email )=>{
    const token = await jwt.sign(
        {email:email} , process.env.JWT_SECRET ,  { expiresIn: process.env.JWT_EXPIRE } 
    ) 
    return token
}

module.exports = generateJWT_Token;




// try {
//     //Creating jwt token
//     token = jwt.sign(
//         {
//             userId: existingUser.id,
//             email: existingUser.email
//         },
//         "secretkeyappearshere",
//         { expiresIn: "1h" }
//     );
// } catch (err) {
//     console.log(err);
//     const error =
//         new Error("Error! Something went wrong.");
//     return next(error);
// }