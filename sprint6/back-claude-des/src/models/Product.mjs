import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  seller:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  description: { type: String },
  image:       { type: String }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
