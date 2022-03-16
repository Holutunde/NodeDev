var express = require('express')
var app = express()
const axios = require('axios')


app.set('view engine', 'ejs')

app.get('/results', function (req, res) {
  axios
    .get('http://www.omdbapi.com/?s=Santa&plot=long&apikey=ae5df87f')

    .then((response) => {
  
      var data = response.data.Search
        console.log(data)
       res.render("results", {data: data})
      console.log(`Status Code: ${response.status}`)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(3006, function () {
  console.log('Api request has been made')
})

// const data = {
//   code: 42,
//   items: [
//     {
//       id: 1,
//       name: 'foo',
//     },
//     { d
//       id: 2,
//       name: 'bar',
//     },
//   ],
// }

// console.log(data.items[1].name)

// const names=["tolu","tunde"]

// for (var i=0; i<=names.length; i++){
//   console.log(names[i])
// }
// names.forEach(function(name){
//   console.log(name)
// })