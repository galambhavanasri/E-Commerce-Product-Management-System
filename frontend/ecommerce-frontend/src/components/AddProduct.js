import React , { useEffect,useState }  from "react";
function AddProduct({ onProductAdded, editingProduct }) {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        quantity: "",
        description: ""
    });
    useEffect(() => {
        if(editingProduct) {
            console.log("Editing  product received:", editingProduct);
            setProduct(editingProduct);
        }
    },[editingProduct]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = product.id ? "PUT" : "POST";
        const url = product.id ? `http://localhost:8080/products/${product.id}` :
        "http://localhost:8080/products";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then((response) => response.json())
        .then((data) => {
            onProductAdded(data);
            setProduct({
                name: "",
                price: "",
                category: "",
                quantity: "",
                description: ""
            });
        })
        .catch((error) => console.error("Error:", error));
    };

    return(
        <div className="container mt-4">
            <h3>Add Product</h3>
            <form onSubmit={handleSubmit}>
                <input name="name" value={product.name} onChange={handleChange} placeholder="Name" className="form-control mb-2"/>
                <input name="price" value={product.price} onChange={handleChange} placeholder="Price" className="form-control mb-2"/>
                <input name="category" value={product.category} onChange={handleChange} placeholder="Category" className="form-control mb-2"/>
                <input name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" className="form-control mb-2"/>
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="form-control mb-2"></textarea>
                <button type="submit" className="btn btn-success"> {product.id ? "Update Product" : "Add Product"}</button>


            </form>
        </div>
    );
}

export default AddProduct;