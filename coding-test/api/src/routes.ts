import * as express from 'express';
export const routes = express.Router();
var fs = require('fs');

routes.get('/api', (req, res) => res.send({hello: 'world'}));
routes.get('/api/dashboard', (req, res) => res.send({hello: 'Dashboard'}));

// TODO change the callback to get single user data
// TODO api/users/all should lead to api/users too
routes.get('/api/user/:id', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json');
    res.write(csvJSON(data.toString()));
    res.end();
  })
})

routes.get('/api/users', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json');
    res.write(csvJSON(data.toString()));
    res.end();
  })
})

interface IObj{
  [key: string]: string;
}

function csvJSON(csv : any){
  var lines=csv.split("\r\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
      var obj: IObj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }
  return JSON.stringify(result); //JSON
}