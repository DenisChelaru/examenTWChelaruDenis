const db = require('./models')

const resultsPerPage = 4

exports.connected = db.connected

module.exports.getMovieById = async (req, res) => {
    try {
        const movie = await db.Movie.findAll({where: {id: req.params.id}})
        if(!movie.length)
            res.status(404).send({message: 'Movie not found'})
        else
            res.status(200).send(movie[0])
    }
    catch (err) {
        res.status(500).send({message: 'Internal server error'})
    }
}

module.exports.getMovie = async (req, res) => {
    try {
        const querry = {}
        if(req.body && req.body.sortBy)
            querry.order = [['title', req.body.sortBy]]
        if(req.body && req.body.filterBy)
            querry.where = req.body.filterBy.reduce((obj, i) => {obj[i[0]] = {[db.operator.substring]: i[1]}; return obj}, {})
        if(req.body && req.body.page != undefined) {
            querry.limit = resultsPerPage
            querry.offset = resultsPerPage * req.body.page
        }
        const movies = await db.Movie.findAll(querry)
        res.send(movies)
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal server error" })
    }   
}

module.exports.postMovie = async (req, res) => {
    try {
        await db.Movie.create({
            title: req.body.title,
            category: req.body.category,
            publication_date: req.body.publication_date
        })
        res.status(201).send({ message: "Movie added" })
    }
    catch (err) {
        if(err.name == 'SequelizeValidationError')
            res.status(400).send({ message: err.errors[0].message })
        else {
            console.error(err)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}

module.exports.putMovie = async (req, res) => {
    try {
        const updates = {}
        if (!(await db.Movie.findAll({ where: { id: req.params.id } })).length) {
            res.status(404).send({ message: "Invalid id (id does not exist)" })
            return
        }
        if (req.body.title)
            updates.title = req.body.title
        if (req.body.category)
            updates.category = req.body.category
        if (req.body.publication_date)
            updates.publication_date = req.body.publication_date
        await db.Movie.update(updates, { where: { id: req.params.id } })
        res.status(200).send({ message: "Movie updated" })
    }
    catch (err) {
        if(err.name == 'SequelizeValidationError')
            res.status(400).send({ message: err.errors[0].message })
        else {
            console.error(err)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}

module.exports.deleteMovie = async (req, res) => {
    try {
        if (!(await db.Movie.findAll({ where: { id: req.params.id } })).length) {
            res.status(404).send({ message: "Invalid id (id does not exist)" })
            return
        }
        await db.Movie.destroy({ where: { id: req.params.id } })
        res.status(200).send({ message: "Movie deleted" })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal server error" })
    }
}



module.exports.getMemberById = async (req, res) => {
    try {
        const member = await db.CrewMember.findAll({where: {id: req.params.id}})
        if(!member.length)
            res.status(404).send({message: 'Member not found'})
        else
            res.status(200).send(member[0])
    }
    catch (err) {
        res.status(500).send({message: 'Internal server error'})
    }
}

module.exports.getMember = async (_, res) => {
    try {
        const members = await db.CrewMember.findAll()
        res.send(members)
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal server error" })
    }   
}

module.exports.postMember = async (req, res) => {
    try {
        await db.CrewMember.create({
            name: req.body.name,
            role: req.body.role,
            movie: req.body.movie
        })
        res.status(201).send({ message: "Movie added" })
    }
    catch (err) {
        if(err.name == 'SequelizeValidationError')
            res.status(400).send({ message: err.errors[0].message })
        else if(err.name == 'SequelizeForeignKeyConstraintError')
            res.status(404).send({ message: "Invalid movie id" })
        else {
            console.error(err)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}

module.exports.putMember = async (req, res) => {
    try {
        const updates = {}
        if (!(await db.CrewMember.findAll({ where: { id: req.params.id } })).length) {
            res.status(404).send({ message: "Invalid id (id does not exist)" })
            return
        }
        if (req.body.movie)
            updates.movie = req.body.movie
        if (req.body.name)
            updates.name = req.body.name
        if (req.body.role)
            updates.role = req.body.role
        await db.CrewMember.update(updates, { where: { id: req.params.id } })
        res.status(200).send({ message: "Member updated" })
    }
    catch (err) {
        if(err.name == 'SequelizeValidationError')
            res.status(400).send({ message: err.errors[0].message })
        else {
            console.error(err)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}

module.exports.deleteMember = async (req, res) => {
    try {
        if (!(await db.CrewMember.findAll({ where: { id: req.params.id } })).length) {
            res.status(404).send({ message: "Invalid id (id does not exist)" })
            return
        }
        await db.CrewMember.destroy({ where: { id: req.params.id } })
        res.status(200).send({ message: "Member deleted" })
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: "Internal server error" })
    }
}