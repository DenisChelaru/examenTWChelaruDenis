const Sequelize = require('sequelize')

const categories = ['action', 'sf', 'drama']
const roles = ['director', 'writer', 'actor']

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db',
    define: {timestamps: false},
    logging: false
})
exports.Movie = sequelize.define('movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Title cannot be empty'
            },
            is: {
                args:["^.{3,}$"],
                msg: "Title too short"
            }
        }
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Category cannot be empty'
            },
            isIn: {
                args: [categories],
                msg: "Invalid category"
            }
        }
    },
    publication_date: Sequelize.DATE
})
exports.CrewMember = sequelize.define('crewMember', {
    movie: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
            model: 'movies',
            key: 'id'
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Name cannot be empty'
            },
            is: {
                args:["^.{3,}$"],
                msg: "Name too short"
            }
        }
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Role cannot be empty'
            },
            isIn: {
                args: [roles],
                msg: "Invalid role"
            }
        }
    },
})
exports.operator = Sequelize.Op
exports.connected = new Promise(async resolve => {
    const timeout = setTimeout(() => resolve(false), 1000)
    try {
        await sequelize.sync()
        resolve(true)
        clearTimeout(timeout)
        // await sequelize.sync({force: true})
    } catch (error) { console.log(error) }
})