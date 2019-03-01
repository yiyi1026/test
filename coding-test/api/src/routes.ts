import * as express from 'express';
export const routes = express.Router();
const fs = require('fs');

routes.get('/api/dashboard', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    calcStat(csvJSON(data.toString()));
    res.send({hello: 'Dashboard'});
  })
})

// TODO change the callback to get single user data
// TODO api/users/all should lead to api/users too
routes.get('/api/user/:id', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(findByID(csvJSON(data.toString()), req.params.id)));
    res.end();
  })
})

routes.get('/api/users', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(csvJSON(data.toString())));
    res.end();
  })
})

interface User{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

function csvJSON(csv : any){
  let lines=csv.split("\r\n");
  let result: User[] = [];
  let headers=lines[0].split(",");
  for(let i=1;i<lines.length;i++){
      let obj: any = {};
      let currentline=lines[i].split(",");
      for(let j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }
  return result; //JSON
}

function findByID(usersJson: User[], id: number){
  return usersJson.find(item => item.id == id);
}

function calcStat(usersJson: User[]){
  let num : number = usersJson.length;
  let totalAge : number = 0;
  let allAges : number[];
  let firstNameCount : {[id:string] : number};
  console.log(usersJson)
  for(let i=0; i<num; i++){
    let user = usersJson[i]
    totalAge += user.age;
    allAges.push(user.age)
    // firstNameCount

  }
  console.log(totalAge)
}