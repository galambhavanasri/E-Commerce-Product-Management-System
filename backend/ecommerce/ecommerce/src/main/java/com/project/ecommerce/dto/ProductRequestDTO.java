package com.project.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class ProductRequestDTO {
	@NotBlank(message = "Product name should not be empty")
	private String name;
	@Positive(message = "Price must be greater than 0")
	private double price;
	private String description;
	private String category;
	@Positive(message = "Quantity must be greater than 0")
	private int quantity;
	public String getName() {
		return name;
	}
	public double getPrice() {
		return price;
	}
	public String getDescription() {
		return description;
	}
	public String getCategory() {
		return category;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
