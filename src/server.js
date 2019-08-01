import express from 'express'

import { render } from 'src/after'
import routes from 'src/routes'

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
      })
      res.send(html)
    } catch (error) {
      console.error(error)
      res.json({ message: error.message, stack: error.stack })
    }
  })

export default server
