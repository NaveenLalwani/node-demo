const { User, Purchase } = require("../models");
const { Op } = require("sequelize");
const fs = require('fs');

const findAddressInJson = ( user_name ) => {
    return new Promise(( resolve, reject ) => {
        const json_file_path = process.env.USER_JSON_FILE_PATH || 'app/config/users.json';
        if(fs.existsSync(json_file_path)) {
            fs.readFile(json_file_path, (err, data) => {
                if (err) {
                    reject(err);
                }
                let users    = data ? JSON.parse(data) : [];
                var findUser =  users.filter(it => it.name === user_name );
                if(findUser[0]) {
                    resolve({
                        address: findUser[0].address
                    });
                } else {
                    reject({
                        message: 'User not found'
                    });
                }
            });
        } else {
            reject({
                message: 'JSON file not exist'
            });
        }
    });
}

exports.create = async (req, res) => {
    const params = req.body;
    // Validate request
    if ( !params.name || !params.address ) {
        res.status(400).send({
            status: 'error',
            message: "Name or address cannot be empty!"
        });
        return;
    }

    // Create a User
    const userObj = {
        name: params.name,
        address: params.address
    };

    User.create(userObj)
    .then(data => {
      res.send({
          status:'success',
          message:'User created successfully!!',
          data
      });
    }).catch(err => {
      res.status(500).send({
        status: 'error',
        message: err.message || "Some error occurred while creating the User.",
      });
    });
}

// find address by user_name
exports.findAddress = async (req, res) => {
    const {params} = req;
    // Validate request
    if ( !params.name ) {
        res.status(400).send({
            status: 'error',
            message: "name key cannot be empty!"
        });
        return;
    }
    findAddressInJson(params.name)
    .then( (data) => {
        if( data && data.address ) {
            res.send({
                status: 'success',
                address: data.address
            });
        } else {
            res.status(400).send({
                status: 'error',
                message: data.message || 'User not found!'
            }); 
        }
    }).catch( (err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving user info."
        });
    });
};

// fidn purchases by use_name
exports.findPurchases = async (req, res) => {
    const {params} = req;
    // Validate request
    if ( !params.name ) {
        res.status(400).send({
            status: 'error',
            message: "name key cannot be empty!"
        });
        return;
    }
    User.findAll({
        where: { name: params.name },
        include: [{
            model:Purchase,
            as:'purchases',
            attributes: ['item_name']
        }],
        attributes: [
            ['name', 'user'],
        ]
    }).then( (data) => {
        res.send({
            status: 'success',
            data
        });
    }).catch( (err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving user info."
        });
    });
};