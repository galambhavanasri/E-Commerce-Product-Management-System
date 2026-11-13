import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const addProductToList = (newProduct) => {
    setProducts((prev) => {
      const exists = prev.find(p => p.id === newProduct.id);
      if(exists){
        return prev.map(p => p.id === newProduct.id ? newProduct : p);
      }else {
        return [...prev, newProduct];
      }
    });

  };
  const deleteProductFromList = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };
  const [editingProduct, setEditingProduct] = useState(null);
  const handleEdit = (product) => {
    console.log("Setting edit product:", product);
    setEditingProduct(product);
  };
  const[searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8080/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);

    });
  }, []);
  if(loading){
    return <h3 className="text-center mt-5">Loading products...</h3>
  }
  return (
    <div>
      <h1 className="text-center">Ecommerce Project</h1>
      <AddProduct onProductAdded={addProductToList}
      editingProduct={editingProduct}/>
       <input type="text" placeholder="Search by name or category..." className="form-control mb-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
       <select className="form-select mb-4" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Mobile">Mobile</option>
        <option value="Accessories">Accessories</option>

       </select>
      <ProductList
        products={filteredProducts}
        onDelete={deleteProductFromList}
        onEdit={handleEdit}
        />
    </div>
  );
}
export default App;