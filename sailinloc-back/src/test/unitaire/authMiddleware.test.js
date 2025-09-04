// src/test/unitaire/authMiddleware.test.js
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middleware/authMiddleware');

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('devrait renvoyer 401 si aucun token n\'est fourni', () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token manquant ou mal formaté' });
    expect(next).not.toHaveBeenCalled();
  });

  it('devrait renvoyer 401 si le token est invalide', () => {
    req.headers.authorization = 'Bearer faketoken';
    jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token invalide ou expiré' });
    expect(next).not.toHaveBeenCalled();
  });

  it('devrait appeler next() si le token est valide', () => {
    const fakePayload = { id: 1, email: 'test@example.com' };
    req.headers.authorization = 'Bearer validtoken';
    jwt.verify.mockReturnValue(fakePayload);

    authMiddleware(req, res, next);

    expect(req.user).toEqual(fakePayload);
    expect(next).toHaveBeenCalled();
  });
});
