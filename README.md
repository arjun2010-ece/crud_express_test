1. Testing controller::

a.  First check whether the controller has functions with "typeof".

b. Then if you are calling model methods inside the above function then in test file import the model and "mock" the methods with `jest.fn`. \
Now do 2 things::

a.  Now you can call the controller methods which in turn call the model methods.
b.  Now do `expect(modelmethods).to have been called` jest methods for function.

c. Since models are always populated with some arguments/data and those things come from request/response object from frontend so now we need to mock those object.
and we do that with `node-mocks-http` package.\

examples::\

req = httpMocks.createRequest(); \
res = httpMocks.createResponse(); \
next = null; \

and attach the body in request like::\

req.body = newTodo; //where newTodo is the sample data.\
