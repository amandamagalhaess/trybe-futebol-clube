const user = {
  id: 1,
  username: 'test',
  role: 'user',
  email: 'test@test.com',
  password: 'test',
}

const users = [user];

const validLoginBody = {
  username: user.username,
  password: user.password,
}

const invalidLoginBodyWithoutUsername = {
  password: user.password,
}

const invalidLoginBodyWithoutPassword = {
  username: user.username,
}

export {
  user,
  users,
  validLoginBody,
  invalidLoginBodyWithoutUsername,
  invalidLoginBodyWithoutPassword,
};