//require packages used in the project
const express = require('express')
const app = express()
const port = 3000
//require express-handlebars & JSON
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//routes setting index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//routes setting show
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('req:', req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  console.log('restaurant:', restaurant)
  res.render('show', { restaurant: restaurant })
})
//routes setting search
app.get('/search', (req, res) => {
  console.log('req:', req.query.keyword)
  if (!req.query.keyword) return

  const keywords = req.query.keyword.trim().toLowerCase()
  console.log('keywords:', keywords)
  ///restaurant.name or .category include req.query.keyword
  const restaurantFilter = restaurantList.results.filter(data =>
    data.name.toLowerCase().includes(keywords) || data.category.includes(keywords)
  )
  res.render('index', { restaurants: restaurantFilter, keyword: req.query.keyword })
})


//start and listen on the Express server
app.listen(port, () => {
  console.log(`app is listening on localhost:${port}`)
})
