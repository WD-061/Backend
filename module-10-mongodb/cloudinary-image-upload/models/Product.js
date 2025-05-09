// Supersimplified

const ProductSchema = new mongoose.Schema({
  title: String,
  // ...
  img: {
    type: String,
  },
  imgPublicId: String,
  // ...
});
