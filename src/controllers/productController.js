const {
    products,
    users
} = require("../models");

const response = {
    status: false,
    message: "",
    data: [],
};
const attributeUser = ['full_name', 'username', 'email', 'phone_number', 'role'];
const attributeProduct = ['name', 'stock', 'price', 'id_user'];

class ProductController {

    static async getProducts(req, res) {
        try {
            const findProducts = await products.findAll({
                attributes: attributeProduct,
                include: [{
                    model: users,
                    attributes: attributeUser
                }]
            });
            if (findProducts.length !== 0) {
                response.status = true;
                response.data = findProducts;
                response.message = "Data ditemukan!";
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async saveProduct(req, res) {
        const {
            body: {
                name,
                stock,
                price,
                id_user
            }
        } = req;

        try {
            const saveProduct = await products.create({
                name,
                stock,
                price,
                id_user
            });
            response.status = true;
            response.message = "Berhasil simpan data";
            response.data = {
                Name: saveProduct.name,
                Stock: saveProduct.stock,
                Price: saveProduct.price,
                Id_user: saveProduct.id_user,
            };
            res.status(201).json(response);
        } catch {
            response.data = '';
            response.status = false;
            response.message = "ID user tidak ada!";
            res.status(400).json(response);
        }
    }

    static async getProduct(req, res) {
        const {
            id
        } = req.params;
        const productDetail = await products.findByPk(
            id, {
                attributes: attributeProduct,
                include: [{
                    model: users,
                    attributes: attributeUser
                }]
            }
        );
        try {
            if (productDetail) {
                response.status = true;
                response.data = productDetail;
                response.message = "Data ditemukan!";
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data tidak ditemukan!";
                res.status(400).json(response);
            }
        } catch (error) {
            response.data = '';
            response.status = false;
            response.message = error.message;
            res.status(404).json(response);
        }
    }

    static async updateProduct(req, res) {
        const {
            id
        } = req.params;
        const {
            name,
            stock,
            price,
            id_user
        } = req.body;
        const auth = await products.update({
            name,
            stock,
            price,
            id_user
        }, {
            where: {
                id: id
            }
        });

        try {
            if (auth) {
                response.data = true;
                response.message = `Data berhasil diubah`;
                response.data = await products.findByPk(
                    id, {
                        attributes: attributeProduct,
                        include: [{
                            model: users,
                            attributes: attributeUser
                        }]
                    });
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal diubah!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }

    static async deleteProduct(req, res) {
        const {
            id
        } = req.params;
        const delProduct = await products.destroy({
            where: {
                id: id
            }
        });

        try {
            if (delProduct) {
                response.status = true;
                response.message = `Data berhasil dihapus`;
                response.data = `ID : ${id}`
                res.status(200).json(response);
            } else {
                response.data = '';
                response.status = false;
                response.message = "Data gagal dihapus!";
                res.status(400).json(response);
            }
        } catch (err) {
            response.data = '';
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
    }
}

module.exports = ProductController;