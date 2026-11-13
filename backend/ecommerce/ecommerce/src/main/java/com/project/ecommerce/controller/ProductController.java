package com.project.ecommerce.controller;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.project.ecommerce.dto.ProductRequestDTO;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.service.ProductService;
import jakarta.validation.Valid;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	private final ProductService productService;
	public ProductController(ProductService productService) {
		this.productService = productService;
	}
	@GetMapping("/products")
	public List<Product> getProducts(){
		return productService.getAllProducts();
	}
	@PostMapping("/products")
	public Product addProduct(@Valid @RequestBody ProductRequestDTO dto) {
		return  productService.saveProduct(dto);
	}
	@PutMapping("/products/{id}")
	public Product updateProduct(@PathVariable int id,@Valid @RequestBody ProductRequestDTO dto) {
		return productService.updateProduct(id, dto);
	}
	@DeleteMapping("/products/{id}")
	public String deleteProduct(@PathVariable int id) {
		return productService.deleteProduct(id);
	}
}