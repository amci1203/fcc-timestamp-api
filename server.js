const moment = require('moment')
const app = require('express')()
const PORT = process.env.PORT

app
.get('/', (req, res) => {
  const d = req.query.d || req.query.date

  let unix = null
  let natural = null

  try {
    if (!d) throw "No param passed. Either 'd' or 'date' will be fine"

    const date = moment(d)
    if (!date._isValid) throw "An invalid date was passed"

    unix = date.unix()
    natural = date.format('MMMM D, YYYY')

    res.json({ unix, natural })
    return

  } catch (error) {
    res.json({ unix, natural, error })
    return
  }
})
.listen(PORT, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Listening on port %s', PORT)
})