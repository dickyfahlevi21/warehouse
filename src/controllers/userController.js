const {
    users,
    products,
} = require("../models");

const response = {
    status: false,
    message: "",
    data: [],
};

const attributeUser = ['full_name', 'username', 'email', 'phone_number', 'role'];
const attributeProduct = ['name', 'stock', 'price', 'id_user'];

class UserController {

    static async getUsers(req, res) {
        try {
            const findUsers = await users.findAll({
                attributes: attributeUser,
                include: [{
                    attributes: attributeProduct
                }]
            });
            if (findUsers.length !== 0) {
                response.data = findUsers;
                response.status = true;
                response.message = "Data found!"
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data not found!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async saveUser(req, res) {
        const {
            body: {
                full_name,
                username,
                email,
                phone_number,
                role
            }
        } = req;

        try {
            const saveUser = await users.create({
                full_name,
                username,
                email,
                phone_number,
                role
            });
            response.data = {
                Full_name: saveUser.full_name,
                Username: saveUser.username,
                Email: saveUser.email,
                Phone_number: saveUser.phone_number,
                Role: saveUser.role
            };
            response.status = true;
            response.message = "Berhasil tambah data"
            res.status(201).json(response);
        } catch (error) {
            response.status = "fail!";
            response.data = '';
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getUser(req, res) {
        const {
            id
        } = req.params;
        const userdetail = await users.findByPk(
            id, {
                attributes: attributeUser,
                include: [{
                    model: products,
                    attributes: attributeProduct,
                }]
            }
        );
        try {
            if (userdetail) {
                response.status = true;
                response.data = userdetail;
                response.message = "Data ditemukan!";
                res.status(200).json(response);
            } else {
                response.status = false;
                response.data = '';
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (error) {
            response.message = error.message;
            response.status = false;
            response.data = '';
            res.status(404).json(response);
        }
    }

    static async updateUser(req, res) {
        const {
            id
        } = req.params;
        const {
            full_name,
            username,
            email,
            phone_number,
            role
        } = req.body;
        const auth = await users.update({
            full_name,
            username,
            email,
            phone_number,
            role
        }, {
            where: {
                id: id
            }
        });

        try {
            if (auth) {
                response.status = true;
                response.message = `Data user berhasil diedit`;
                response.data = await users.findByPk(
                    id, {
                        attributes: attributeUser,
                        include: [{
                            model: products,
                            attributes: attributeProduct,
                        }]
                    }
                );
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = false;
            response.data = '';
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deleteUser(req, res) {
        const {
            id
        } = req.params;
        const delUser = await users.destroy({
            where: {
                id: id
            }
        });

        try {
            if (delUser) {
                response.status = true;
                response.data = `ID : ${id}`;
                response.message = `Data user berhasil dihapus`;
                res.status(200).json(response);
            }
        } catch (err) {
            response.status = false;
            response.data = '';
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = UserController;