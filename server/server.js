const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const userData = require('./data/employee');
const department = require('./data/department');

server.get('/api/employee', (req, res, next) => {
  res.status(200).send(userData.getEmployees);
});

server.get('/api/employee/search*', (req, res, next) => {
  res.status(200).send(userData.getEmployees);
});

server.get('/api/employee/1', (req, res, next) => {
  res.status(200).send(userData.getEmployee);
});

server.post('/api/*', (req, res, next) => {
  res.status(200).send({
    ...req.body,
    id: "1"
  });
});

server.put('/api/*', (req, res, next) => {
  res.status(500).send({
    message: "ไม่สามารถบันทึกข้อมูลได้"
  });
});

server.delete('/api/*', (req, res, next) => {
  res.status(200).send();
});

server.get('/api/department', (req, res, next) => {
  res.status(200).send(department.getDepartments);
});

server.get('/api/department/*', (req, res, next) => {
  res.status(200).send(department.getDepartments);
});

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
