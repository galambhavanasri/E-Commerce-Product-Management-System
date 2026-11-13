package com.project.ecommerce.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.project.ecommerce.dto.ProductRequestDTO;
import com.project.ecommerce.exception.ResourceNotFoundException;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.repository.ProductRepository;
@Service
public class ProductService {
	private final ProductRepository productRepository;
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	public Product saveProduct(ProductRequestDTO dto) {
		Product product = new Product();
		product.setName(dto.getName());
		product.setPrice(dto.getPrice());
		product.setDescription(dto.getDescription());
		product.setCategory(dto.getCategory());
		product.setQuantity(dto.getQuantity());
		return productRepository.save(product);
	}
	public Product updateProduct(int id,ProductRequestDTO dto) {
		Product existingProduct = productRepository.findById(id)
		.orElseThrow(()->new ResourceNotFoundException("Product Not Found"));
		existingProduct.setName(dto.getName());
		existingProduct.setPrice(dto.getPrice());
		existingProduct.setDescription(dto.getDescription());
		existingProduct.setCategory(dto.getCategory());
		existingProduct.setQuantity(dto.getQuantity());
		return productRepository.save(existingProduct);
	}
	public String deleteProduct(int id) {
		if(!productRepository.existsById(id)) {
			throw new ResourceNotFoundException("Product Not Found");
		}
		productRepository.deleteById(id);
		return "Product deleted successfully";
	}
}