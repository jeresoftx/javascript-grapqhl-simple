const mockRequest = (headers) => ({
  get(name) {
    return headers[name];
  },
  headers,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

module.exports = { mockRequest, mockResponse };
