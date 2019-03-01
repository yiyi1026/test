import express from "express"

const app = express()
const port: Number = 3001
var fs = require('fs');

app.get('/api/getUsers', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json');
    res.write(csvJSON(data.toString()));
    res.end();
  })
})
app.listen(port, () => console.log(`app listening on port ${port}`))

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