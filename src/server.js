/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import router from './routes.js '

const routes = router

const app = express()
app.use(express.json())
app.use(routes)
app.use((error, req, res, next) => {
  console.log('### Error Handler')
  console.log(error)
  res.sendStatus(500)
})

app.listen(3000, () =>
  console.log('✅ Server running at http://localhost:3000 '),
)
