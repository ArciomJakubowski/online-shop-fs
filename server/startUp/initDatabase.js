const Product = require("../models/Product");

const productMock = require("../mock/products.json");

module.exports = async () => {
  const products = await Product.find();
  if (products.length !== productMock.length) {
    await createInitialEntity(Product, productMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
