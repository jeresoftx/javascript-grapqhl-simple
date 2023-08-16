const mockRequest = (headers) => ({
  get(name) {
    return headers[name];
  },
  headers,
});

const mockResponse = () => ({});

module.exports = { mockRequest, mockResponse };
