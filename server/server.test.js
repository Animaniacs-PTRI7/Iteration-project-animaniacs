const request = require('supertest');

// this is http://localhost:3000   <<< precisely this
const server = require('./server');

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe('POST /auth/login', () => {
  describe('given a username and password', () => {
    //should save username and password to database
    // should respond with a json object containing the user id

    // should respond with 200 status code
    test('should respond with 200 status code', async () => {
      const response = await request(server)
        .post('/auth/login')
        .send({
          username: `test1@test.com'
          `,
          password: `test1_pw
          `,
        });
      expect(response.statusCode).toBe(200);
    });
    // should specify json in the content type header
  });

  describe('when the password is missing', () => {
    // respond with status code 400 because user error
    test('should return a 400 status code', async () => {
      const response = await request(server).post('/auth/login').send({
        username: 'test1@test.com',
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe('when the username is missing', () => {
    // respond with status code 400 because user error
    test('should return a 400 status code', async () => {
      const response = await request(server).post('/auth/login').send({
        password: 'test',
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('POST /auth/signup', () => {
  describe('signing up as a SELLER works properly', () => {
    //should save username and password to database
    // should respond with a json object containing the user id

    // should respond with 200 status code
    it('should respond with 200 status code', async () => {
      const response = await request(server)
        .post('/auth/signup')
        .send({
          userType: 'seller',
          seller_email: `${makeid(10)}@gmail.com`,
          password: `${makeid(10)}`,
          seller_nickname: `${makeid(10)}`,
        });
      expect(response.statusCode).toBe(200);
    });
  });
  describe('signing up as a BUYER works properly', () => {
    //should save username and password to database
    // should respond with a json object containing the user id

    // should respond with 200 status code
    test('should respond with 200 status code', async () => {
      const response = await request(server)
        .post('/auth/signup')
        .send({
          userType: 'buyer',
          buyer_email: `${makeid(7)}@gmail.com`,
          password: `${makeid(10)}`,
          buyer_nickname: `${makeid(10)}`,
        });
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('testing getAll controllers', () => {
  describe('testing getAll BUYERS', () => {
    test('should respond 200 code when attempting to retrieve all buyers', async () => {
      const response = await request(server).get('/buyerusers');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('testing getAll SELLERS', () => {
    test('should respond 200 code when attempting to retrieve all sellers', async () => {
      const response = await request(server).get('/sellerusers');
      expect(response.statusCode).toBe(200);
    });
  });
});
