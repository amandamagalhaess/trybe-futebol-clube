const user = {
  id: 1,
  username: 'test',
  role: 'user',
  email: 'test@test.com',
  password: 'test',
}

const users = [user];

const validLoginBody = {
  email: user.email,
  password: user.password,
}

const invalidLoginBodyWithoutEmail = {
  password: user.password,
}

const invalidLoginBodyWithoutPassword = {
  email: user.email,
}

export {
  user,
  users,
  validLoginBody,
  invalidLoginBodyWithoutEmail,
  invalidLoginBodyWithoutPassword,
};