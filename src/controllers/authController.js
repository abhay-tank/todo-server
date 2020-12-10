// POST
const signUp = (req, res) => {
  res.send("SignUp");
};
// POST
const signIn = (req, res) => {
  res.send("SignIn");
};
// PATCH
const changePassword = (req, res) => {
  res.send("Patch");
};
// GET
const signOut = (req, res) => {
  res.send("SignOut");
};

module.exports = { signUp, signIn, changePassword, signOut };
