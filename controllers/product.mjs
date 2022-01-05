import { Product } from "../models/index.mjs";

const ProductController = {
    addProduct: async (req, res) => {
        try {
            const { status, ...data } = req.body;
            const product = new Product(data);
            
            await product.save();
            return res.status(201).json({
                ok:true,
                msg:'El producto ha sido creado exitosamente',
                product
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'Contacta al admin pa que arregle su verguero',
                error
            });
        }
    },
    getProducts: async (req, res) => {
        try {
            const { from = 0, limit = 5} = req.query;
            const [products, total] = await Promise.all([
                Product.find({ status: true }).limit(+limit).skip(+from),
                Product.countDocuments()
            ]);

            return res.status(200).json({
                ok:true,
                total,
                products
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'Contacta al admin pa que arregle su verguero',
                error
            });
        }
    },
    getSingleProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const dbProduct = await Product.findById(id).populate('user').populate('category');

            if(!dbProduct.status){
                return res.status(400).json({
                    ok:false,
                    msg:'Este producto se encuentra inactivo, no se puede mostrar la información'
                });
            }

            return res.status(200).json({
                ok: true,
                dbProduct
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'Hablar con el admin para que arregle su verguero',
                error
            });
        }
    }
}

export default ProductController;