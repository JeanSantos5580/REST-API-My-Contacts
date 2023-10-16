/* eslint-disable camelcase */
import ContactsRepository from '../repositories/ContactsRepository.js'

class ContactController {
  async index(req, res) {
    // Serve para listar todos os registros
    const { orderBy } = req.query
    const contacts = await ContactsRepository.findAll(orderBy)
    res.json(contacts)
    res.send(req.appId)
  }

  async show(req, res) {
    // Serve para obter UM registro
    const { id } = req.params
    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(contact)
  }

  async store(req, res) {
    // Serve para criar novo registro
    const { name, email, phone, category_id } = req.body
    if (!name) {
      return res.status(200).json({ error: 'Name is required' })
    }
    const contactExists = await ContactsRepository.findByEmail(email)

    if (contactExists) {
      return res
        .status(400)
        .json({ error: 'This e-mail has already been taken' })
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    })

    res.json(contact)
  }

  async update(req, res) {
    // Serve para editar um registro
    const { id } = req.params
    const { name, email, phone, category_id } = req.body

    // Verify if exists a user idenfied by params id
    const contactExists = await ContactsRepository.findById(id)

    // Error handles
    if (!contactExists) {
      return res.status(404).json({ error: 'User not found.' })
    }

    if (!name) {
      return res.status(404).json({ error: 'Name is required.' })
    }

    const contactByEmail = await ContactsRepository.findByEmail(email)

    if (contactByEmail && contactByEmail.id !== id) {
      return res
        .status(400)
        .json({ error: 'This e-mail has already been taken' })
    }

    // Efter all verifications, process continues
    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    })

    res.json(contact)
  }

  async delete(req, res) {
    // Serve para deletar um registro
    const { id } = req.params

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return res.status(404).json({ error: 'User not found' })
    }

    await ContactsRepository.delete(id)
    res.sendStatus(204)
  }
}

// Uses design pattern Singleton
export default new ContactController()
