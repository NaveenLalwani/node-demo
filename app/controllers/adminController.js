const { User } = require("../models");
const { Op } = require("sequelize");
const fs = require('fs');

exports.updateRole = async (req, res) => {
    console.log("admin controller");
    User.update(
        {role: 'admin'},
        {where: { name: 'user_admin1' } }
    ).then(function(rowsUpdated) {
        if(rowsUpdated[0] && rowsUpdated[0]>0) {
            res.send({
                status: 'success',
                message: 'Hey mate! You are an admin now!!',
            });
        } else {
            res.status(404).send({
                status: 'error',
                message: 'No records found that needs update',
            });
        }
    }).catch( () => {
        res.status(500).send({
            status: 'error',
            message: 'Not able to update admin'
        });
    });
}

exports.syncUserList = async (req, res) => {
    const json_file_path = process.env.USER_JSON_FILE_PATH || 'app/config/users.json';
    User.findAll(
        { where: { 
            name: {
                [Op.ne]: 'user_admin'
            }
        }
    }).then(data => {
        if( data && data.length>0 ) {
            fs.writeFile(json_file_path, JSON.stringify(data), 'utf8', () => {

            });
            res.send({
                status: 'success',
                data
            });
        } else {
            res.status(400).send({
                status: 'error',
                message: "User not found!"
            }); 
        }
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user info."
        });
    });
}