import User from './models/UserModel.mjs';

async function insertUser(username, password, email) {
   await User.build({username:username, password: password, email:email}).save();
}

export default insertUser;
