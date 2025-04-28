import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId, // Relación con el modelo User
            ref: 'User', // Nombre del modelo relacionado
            required: true, // Asegura que cada producto tenga un usuario asociado
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     seller: {
//       type: mongoose.Schema.Types.ObjectId, // Relación con el modelo User
//       ref: "User", // Nombre del modelo relacionado
//       required: true, // Asegura que cada producto tenga un usuario asociado
//     },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", ProductSchema);
// export default Product;
