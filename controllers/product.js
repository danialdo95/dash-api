const Product = require("../models/Product");

exports.getAllProducts = (req, res) => {
    console.log("Fetching all products");

    Product.findAll()
        .then(products => {
            console.log("Products fetched successfully:", products);
            if (!products || products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }
            console.log("Products found:", products.length);
            // Optionally, you can format the product data before sending it
            products = products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }));
            console.log("Formatted products:", products);
            // Send the list of products as a JSON response
            console.log("Sending products response");
            console.log("Response status code:", res.statusCode);
            console.log("Response headers:", res.getHeaders());
            console.log("Response body:", products);
            console.log("Response sent successfully");

            res.json(products);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.getProductById = (req, res) => {
    const productId = req.params.productId;
    console.log(`Fetching product with ID: ${productId}`);

    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                console.log(`Product with ID ${productId} not found`);
                return res.status(404).json({ message: "Product not found" });
            }
            console.log("Product fetched successfully:", product);
            res.json({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });
        })
        .catch(err => {
            console.error("Error fetching product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.createProduct = (req, res) => {
    const { name, price, description } = req.body;
    console.log("Creating new product:", { name, price, description });

    Product.create({ name, price, description })
        .then(product => {
            console.log("Product created successfully:", product);
            res.status(201).json({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });
        })
        .catch(err => {
            console.error("Error creating product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.updateProduct =  (req, res) => {
    const productId = req.params.productId;
    const { name, price, description, stock } = req.body;
    console.log(`Updating product with ID: ${productId}`, { name, price, description, stock });

    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                console.log(`Product with ID ${productId} not found`);
                return res.status(404).json({ message: "Product not found" });
            }
            return product.update({ name, price, description });
        })
        .then(updatedProduct => {
            console.log("Product updated successfully:", updatedProduct);
            res.json({
                id: updatedProduct.id,
                name: updatedProduct.name,
                price: updatedProduct.price,
                description: updatedProduct.description,
                stock: updatedProduct.stock,
                createdAt: updatedProduct.createdAt,
                updatedAt: updatedProduct.updatedAt
            });
        })
        .catch(err => {
            console.error("Error updating product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

exports.deleteProduct = (req, res) => {
    const productId = req.params.productId;
    console.log(`Deleting product with ID: ${productId}`);

    Product.destroy({ where: { id: productId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                console.log(`Product with ID ${productId} not found`);
                return res.status(404).json({ message: "Product not found" });
            }
            console.log("Product deleted successfully");
            res.status(204).send();
        })
        .catch(err => {
            console.error("Error deleting product:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}