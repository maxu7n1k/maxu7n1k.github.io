
export default class Product {
  constructor({ name, price, category, description, imageUrl }) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.imageUrl = imageUrl;
    this.createdAt = new Date().toISOString(); // опціонально
  }

  toFirestore() {
    return {
      name: this.name,
      price: this.price,
      category: this.category,
      description: this.description,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
    };
  }
}
