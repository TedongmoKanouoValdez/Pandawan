const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../../app'); // ton serveur Express

const prisma = new PrismaClient();

describe('Inscription utilisateur', () => {

  // Nettoyage avant chaque test
  beforeEach(async () => {
    await prisma.utilisateur.deleteMany({
      where: {
        email: {
          contains: '@example.com', // 🔒 on ne supprime que les utilisateurs de test
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect(); // fermeture propre de Prisma
  });

  it('POST /api/auth/register → devrait créer un utilisateur et renvoyer 201', async () => {
    const newUser = {
      nom: 'Doe',
      prenom: 'Jane',
      email: 'jane.doe.test@example.com',
      password: 'Password123!',
      role: 'CLIENT',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('nom', 'Doe');
    expect(res.body.user).toHaveProperty('prenom', 'Jane');
    expect(res.body.user).toHaveProperty('email', 'jane.doe.test@example.com');
    expect(res.body.user).not.toHaveProperty('motDePasse'); // mot de passe ne doit pas apparaître
  });

  it('POST /api/auth/register → devrait refuser un email déjà utilisé', async () => {
    const existingUser = {
      nom: 'Doe',
      prenom: 'Jane',
      email: 'jane.doe.test@example.com', // même email que le test précédent
      password: 'Password123!',
      role: 'CLIENT',
    };

    // On crée l'utilisateur une première fois
    await request(app).post('/api/auth/register').send(existingUser);

    // Deuxième tentative → doit échouer
    const res = await request(app)
      .post('/api/auth/register')
      .send(existingUser);

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('message', 'Email déjà utilisé');
  });
});

// login
describe('Connexion utilisateur', () => {
  const userCredentials = {
    email: 'jane.doe.test@example.com',
    password: 'Password123!',
  };

  it('POST /api/auth/login → devrait renvoyer un token pour un utilisateur existant', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(userCredentials);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('POST /api/auth/login → devrait échouer pour un mot de passe incorrect', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userCredentials.email,
        password: 'WrongPassword!',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Mot de passe incorrect');
  });

  it('POST /api/auth/login → devrait échouer pour un utilisateur inexistant', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Utilisateur non trouvé');
  });
});

// jwt
const jwt = require('jsonwebtoken');

describe('Vérification du JWT', () => {
  it('devrait renvoyer un JWT valide contenant les bonnes informations', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane.doe.test@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty('userId');
    expect(decoded).toHaveProperty('email', 'jane.doe.test@example.com');
    expect(decoded).toHaveProperty('role', 'CLIENT');
  });
});

