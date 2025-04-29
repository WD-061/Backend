export const log = (req, res, next) => {
  console.log('Hello from middleware one');

  //You can manipulate the request and response object like below
  req.userEmail = 'john@gmail.com';

  //Pass control to the next middleware or requesthandler
  next();
};
