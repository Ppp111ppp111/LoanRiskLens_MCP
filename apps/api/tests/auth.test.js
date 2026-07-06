const { authorizeSelfOrAdmin } = require('../src/middleware/auth');

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe('authorizeSelfOrAdmin', () => {
  it('allows admins to access any user data', () => {
    const req = {
      user: { userId: 'admin-user', role: 'admin' },
      params: { userId: 'customer-user' },
      body: {},
    };
    const res = createResponse();
    const next = jest.fn();

    authorizeSelfOrAdmin(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('allows users to access their own route data', () => {
    const req = {
      user: { userId: 'customer-user', role: 'user' },
      params: { userId: 'customer-user' },
      body: {},
    };
    const res = createResponse();
    const next = jest.fn();

    authorizeSelfOrAdmin(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('blocks users from accessing another customer', () => {
    const req = {
      user: { userId: 'customer-user', role: 'user' },
      params: { userId: 'other-user' },
      body: {},
    };
    const res = createResponse();
    const next = jest.fn();

    authorizeSelfOrAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: 'Forbidden',
    }));
  });
});
