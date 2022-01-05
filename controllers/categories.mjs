import { Category } from "../models/index.mjs";

const CategoriesController = {
    addCategory: async (req, res) => {
       try {
           const { name } = req.body;
           const dbCategory = new Category({
               name,
               user: req.authenticatedUser._id
           });
           
           await dbCategory.save();
           return res.status(201).json({
               ok:true,
               msg:`La categoría ${ name } ha sido creada.`
           });
           
       } catch (error) {
           console.log(error);
           return res.status(500).json({
               ok:false,
               msg:'Hablar con el admin para que arregle su verguero',
               error
           });
       }
    },
    getCategories: async (req, res) => {
        try {
            const { from = 0, limit = 5} = req.query;
            const query = { status: true }
            const [categories, total] = await Promise.all([
                Category.find(query).skip(+from).limit(+limit).populate('user'),
                Category.countDocuments()
            ]);

            return res.status(200).json({
                ok:true,
                total,
                categories
            })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'Hablar con el admin para que arregle su verguero',
                error
            });
        }
    },
    getSingleCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const dbCategory = await Category.findById(id).populate('user');

            if(!dbCategory.status){
                return res.status(400).json({
                    ok:false,
                    msg:'Esta categoría se encuentra inactiva, no se puede mostrar la información'
                });
            }

            return res.status(200).json({
                ok: true,
                dbCategory
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'Hablar con el admin para que arregle su verguero',
                error
            });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { status, ...data } = req.body;
            data.user = req.authenticatedUser._id;
            const dbCategory = await Category.findByIdAndUpdate(id, data , { new : true }).populate('user');

            return res.status(200).json({
                ok: true,
                dbCategory
            });
       
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg:'Hablar con el admin para que arregle su verguero',
                error
            });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const dbCategory = await Category.findByIdAndUpdate(id, { status:false }, { new : true }).populate('user');
            
            return res.status(200).json({
                ok: true,
                dbCategory
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

export default CategoriesController;