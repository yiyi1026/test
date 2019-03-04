import * as express from 'express'
export const routes = express.Router()
const fs = require('fs')

routes.get('/api/dashboard', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(calcStat(csvJSON(data.toString()))))
    res.end()
  })
})

routes.get('/api/user/:id', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(findByID(csvJSON(data.toString()), req.params.id)))
    res.end()
  })
})

routes.get('/api/users', (req, res) => {
  fs.readFile('src/data/user_database.csv', function (err: any, data: any) {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(csvJSON(data.toString())))
    res.end()
  })  
})

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  age: number
}

function csvJSON(csv: any) {
  let lines = csv.replace("\r", "").split('\n')
  let result: User[] = []
  let headers = lines[0].split(",")
  for (let i = 1; i < lines.length; i++) {
    let obj: any = {}
    if(lines[i].trim() == ''){
      continue
    }
    let currentline = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}

function findByID(usersJson: User[], id: number) {
  return usersJson.find(item => item.id == id)
}

function calcStat(usersJson: User[]) {
  let num: number = usersJson.length
  let totalAge: number = 0
  let allAges: number[] = []
  let medianAge: number = 0
  let firstNameCount: { [id: string]: number } = {}

  for (let i = 0; i < num; i++) {
    let user = usersJson[i]
    totalAge += Number(user.age)
    allAges.push(Number(user.age))
    if (firstNameCount[user.first_name]) {
      firstNameCount[user.first_name] = firstNameCount[user.first_name] + 1
    } else {
      firstNameCount[user.first_name] = 1
    }
  }

  allAges.sort()
  if (num % 2 === 0) {
    medianAge = (allAges[num / 2 - 1] + allAges[num / 2]) / 2
  } else {
    medianAge = allAges[(num - 1) / 2]
  }

  var firstNameCountArr = Object.keys(firstNameCount).map(function (key) {
    return [key, firstNameCount[key]]
  })
  firstNameCountArr.sort(function (first: any, second: any) {
    return second[1] -first[1] ||
    first[0].toLowerCase().localeCompare(second[0].toLowerCase())
  })
  
  return {
    count: num,
    averageAge: parseFloat((totalAge / num).toFixed(1)),
    medianAge: medianAge,
    topFiveName: firstNameCountArr.slice(0, 5)
  }
}