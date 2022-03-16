const axios = require('axios')

// Make request
axios
  .get('https://jsonplaceholder.typicode.com/posts/1')

  .then((res) => {
    console.log(res.data.title)
    console.log(`Status Code: ${res.status}`)
  })
  .catch((err) => {
    console.log(err)
  })

// axios.get('http://www.reddit.com').then((res) => {
//   console.log(JSON.parse(body))
// })
