import { productsModel } from "./models/productsModel.js";

export class ProductsDAO {
  async getProducts(limit, page, category, sort, disp) {
    try {
      let query = { status: true };

      if (disp !== undefined) {
        query.status = Boolean(disp);
      }

      if (category) {
        query.category = category;
      }

      const options = {
        lean: true,
        page: page || 1,
        limit: limit || 10,
      };

      if (sort) {
        options.sort = { price: sort };
      }

      return await productsModel.paginate(query, options);
    } catch (error) {
      console.error("Error getting products:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      return await productsModel.findOne({ status: true, _id: id });
    } catch (error) {
      console.error("Error getting product by ID:", error);
      return null;
    }
  }

  async createProduct(title, description, code, price, stock, category, thumbnail, owner) {
    try {
      return await productsModel.create({
        title,
        description,
        code,
        price: Number(price),
        stock: Number(stock),
        category,
        thumbnail,
        owner,
        status: true,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      return null;
    }
  }

  async updateProduct(id, body) {
    try {
      return await productsModel.updateOne({ _id: id, status: true }, { $set: body });
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const existingProduct = await productsModel.findOne({ status: true, _id: id });
      if (!existingProduct) {
        return null;
      }

      return await productsModel.updateOne({ _id: id }, { $set: { status: false } });
    } catch (error) {
      console.error("Error deleting product:", error);
      return null;
    }
  }
}
