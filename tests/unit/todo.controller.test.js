const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

//mock function of other packages
TodoModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
})

describe('TodoController.createToDo', () => {

  it('should have a createToDo function', () => {
    expect(typeof TodoController.createToDo).toBe("function");
  });

  it('should call TodoModel.create method', () => {
    req.body = newTodo;
    TodoController.createToDo(req, res, next);
    expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
  });

  it('should return 201 response code', () => {
    req.body = newTodo;
    TodoController.createToDo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return return json body in response", () => {
    req.body = newTodo;
    TodoModel.create.mockReturnValueOnce(newTodo);
    TodoController.createToDo(req, res, next);
    expect(res._isJSON()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
})
