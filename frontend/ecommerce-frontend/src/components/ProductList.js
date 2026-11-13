import React from "react";

function ProductList({products, onDelete, onEdit}) {

      const handleDelete = (id) => {
        fetch(`http://localhost:8080/products/${id}`,{
            method:"DELETE",
        })
        .then(() => onDelete(id))
        .catch((error) => console.error("Error:", error));
    };

    return(
        <div className="container mt-4">
            <h2 className="text-center mb-4">Products List</h2>
            <div className="row">
                { products.length > 0 ?(
                            products.map((product) => (
                                <div className="col-md-4 d-flex" key={product.id}>
                                    <div className="card mb-4 shadow-sm w-100">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.name}</h5>

                                            <p className="card-text">
                                                <strong>Price:</strong> {product.price} <br/>
                                                <strong>Category:</strong> {product.category} <br/>
                                                <strong>Qunatity:</strong> {product.quantity} <br/>
                                                 <strong>Description:</strong>{product.description|| "No description"}



                                            </p>
                                            <div className="mt-auto">
                                                <button className="btn btn-primary me-2">View</button>
                                                 <button className="btn btn-warning me-2" onClick={() =>{console.log("Edit clicked", product); onEdit(product);}}>Edit</button>
                                                <button className="btn btn-danger me-2" onClick={() => handleDelete(product.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             ))
                            ) : (
                                <div className="text-center mt-5">
                                    <h4>No Products Found</h4>
                                    <p className="text-muted">Try adding or searching different products</p>
                                </div>
                            )}
            </div>
        </div>
    );
}
export default ProductList;