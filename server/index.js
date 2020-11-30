/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require('faker');

/**
 * Generate products
 */
const products = [];
for (let i = 0; i < 10; i++) {
  products.push({
    id: i + 1,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    picture: faker.image.imageUrl() + `?id=${i}`,
  });
}

/**
 * isLogged middleware
 */
function isLogged(request, reply, next) {
  if (!request.session.user) {
    return reply.code(401).send(true);
  }
  next();
}

module.exports = app => {
  app.register(require('fastify-cors'), {
    origin: true,
  });
  app.register(require('fastify-cookie'));
  app.register(require('fastify-session'), {
    secret: 'my secret for session, needs to be 32 characters long',
    cookie: {
      path: '/',
      secure: false,
      sameSite: true,
    },
  });

  app.get('/api/products', () => {
    return products;
  });

  app.get('/api/products/:id', ({ params }) => {
    const id = parseInt(params.id);
    return products.find(product => product.id === id);
  });

  app.get('/api/cart', ({ session }) => {
    return session.cart || [];
  });

  app.post('/api/cart', ({ body, session }) => {
    const { id, qty } = body;
    const cart = session.cart || (session.cart = []);

    const index = cart.findIndex(row => row.id === id);
    let row;
    if (index >= 0) {
      row = cart[index];
    }

    if (qty > 0) {
      // Add to cart
      if (row) {
        row.qty += qty;
      } else {
        cart.push({
          id,
          qty,
        });
      }
    } else if (qty < 0 && row) {
      // Decrement qty
      row.qty += qty;
      if (row.qty < 0) cart.splice(index, 1);
    } else if (row) {
      // Remove completly
      cart.splice(index, 1);
    }

    return session.cart;
  });

  app.get('/api/profile', ({ session }) => {
    return session.user || null;
  });

  app.post('/api/login', ({ session, body }) => {
    const { email } = body;
    session.user = { email };
    return session.user;
  });

  app.post(
    '/api/logout',
    {
      preHandler: [isLogged],
    },
    ({ session }) => {
      session.user = null;
      return true;
    },
  );
};
