module.exports = {
   validateUser,
};

function validateUser(user) {
   let errors = [];

   if (!user.username || user.username.length < 5) {
      errors.push('Username has to be at least 5 characters in length.');
   }
   if (!user.email || user.email.length < 5) {
      errors.push('Email has to be at least 5 characters in length.');
   }
   if (!user.password || user.password.length < 8) {
      errors.push('Password has to be at least 8 characters in length.');
   }
   return {
      isSuccessful: errors.length > 0 ? false : true,
      errors,
   };
}
