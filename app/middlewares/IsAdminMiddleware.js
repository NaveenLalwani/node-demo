const { User } = require("../models");
const { Op } = require("sequelize");

module.exports = (req, res, next) => {
    const { params } = req;
    User.findAll(
        { where: { 
            name: {
                [Op.eq]: params.admin_name,
            },
            role: 'admin'
        }
    }).then(data => {
        if( ! data || data.length === 0 ) {
            return res.status(400).send({
                status: 'error',
                message: "You are not allowed to access this."
            });
        }
    }).catch(err => {
        return res.status(400).send({
            status: 'error',
            message: "You are not allowed to access this."
        });
    });
    next(); 
};