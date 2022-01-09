import mongoose from 'mongoose';

import { User, Category, Product } from '../models/index.mjs';

const validCollections = [
    'users',
    'categories',
    'products',
    'roles'
]


const search = async (req, res) => {
  try {
      const { collection, query } = req.params;

      if (!validCollections.includes(collection)) {
          return res.status(400).json({
              ok:false,
              msg:`La colecciones permitidas son ${validCollections}`
          });
      }
    const results = await searchCollection(collection, query, res);

    return res.status(200).json({
        ok: true,
        results
    });
      
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          ok:false,
          msg:'Verguero',
          error
      })
  }
}

const searchCollection = (collection, query, res) => {
    const search = {
        users: searchUser(query),
        categories: searchCategories(query),
        products: searchProducts(query),
        default: () => {
            return res.status(500).json({
                ok:false,
                msg:'Verguero, al parecer no está tomando las coelcciones permitidas'
            })
        },
    } 
    
    return search[collection] || search['default']();
}


const searchUser = async (query = '') => {
    try {
        const isMongoID =  mongoose.Types.ObjectId.isValid(query); // True o false
        
        if (isMongoID) {
            const dbUser = await User.findById(query);

            return res.status(200).json({
                ok:true,
                results: (dbUser) ? [dbUser] : []
            });
        }
        // Expresión regular para que las búsquedas sean insensibles a las mayusculas y minusculas
        const regex = new RegExp(query, 'i');
        /* db.employees.find( { first_name: { $regex: /michael/i } } ) */
        const dbUsers = await User.find({ 
            $or: [ { name: regex }, { email: regex }],
            $and: [ { status: true}]
        });

        return dbUsers;

    } catch (error) {
        console.log(error);
    }
}

const searchCategories = async (query = '') => {
    try {
        // Expresión regular para que las búsquedas sean insensibles a las mayusculas y minusculas
        const regex = new RegExp(query, 'i');
        /* db.employees.find( { first_name: { $regex: /michael/i } } ) */
        const dbCategories = await Category.find({ name: regex });

        return dbCategories;

    } catch (error) {
        console.log(error);
    }
}

const searchProducts = async (query = '') => {
    try {
        // Expresión regular para que las búsquedas sean insensibles a las mayusculas y minusculas
        const regex = new RegExp(query, 'i');
        /* db.employees.find( { first_name: { $regex: /michael/i } } ) */
        const dbProducts = await Product.find({ name: regex });

        return dbProducts;

    } catch (error) {
        console.log(error);
    }
}

export {
    search
}