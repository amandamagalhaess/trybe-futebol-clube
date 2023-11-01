const user = {
  id: 1,
  username: 'test',
  role: 'user',
  email: 'test@test.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const users = [user];

const validLoginBody = {
  email: user.email,
  password: 'secret_user',
}

const invalidLoginBodyWithoutEmail = {
  password: 'secret_user',
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