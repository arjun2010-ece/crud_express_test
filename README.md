1. Testing controller::

a.  First check whether the controller has functions with "typeof".

b. Then if you are calling model methods inside the above function then in test file import the model and "mock" the methods with `jest.fn`. \
Now do 2 things::

a.  Now you can call the controller methods which in turn call the model methods.\

b. Since models are always populated with some arguments/data and those things come from request/response object from frontend so now we need to mock those object.
and we do that with `node-mocks-http` package.\

examples::\

req = httpMocks.createRequest(); 
res = httpMocks.createResponse(); 
next = null; 

and attach the body in request like::

req.body = newTodo; //where newTodo is the sample data object.

c.  Now do `expect(modelmethods/create).tohavebeencalled` jest methods for function with 
the newTodo arguments.\  === Testing of model methods as model is populated with some data

d.  Once the model is crated then the created response code is '201' so now check that in response and also whether response is sent or not.

example::

`
req = httpMocks.createRequest(); 
res = httpMocks.createResponse();
req.body = newTodo;

TodoController.createToDo(req, res, next);

expect(res.statusCode).toBe(201); // in control we need to need res.status(201)

expect(res._isEndCalled()).toBeTruthy(); // in control we need res.send() or res.json() meaning response is sent.
`

e.  Final thing to test is controller should return json body in response or not like below::

`
    req.body = newTodo;
    TodoModel.create.mockReturnValueOnce(newTodo); // mock the return value of models first
    TodoController.createToDo(req, res, next); // call the controller method
    expect(res._isJSON()).toBeTruthy(); // check response is json
    expect(res._getJSONData()).toStrictEqual(newTodo); // response is sending desired json Data
`
