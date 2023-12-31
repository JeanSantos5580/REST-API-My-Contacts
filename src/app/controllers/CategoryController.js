import CategoriesRepository from '../repositories/CategoriesRepository.js'
import 'express-async-errors'

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query
    const categories = await CategoriesRepository.findAll(orderBy)
    res.json(categories)
  }

  async store(req, res) {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    const category = await CategoriesRepository.create({ name })
    res.json(category)
  }
}

export default new CategoryController()
