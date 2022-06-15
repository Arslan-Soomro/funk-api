const AdminSchema = `admin(
    username VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL 
)`;

const BuyerSchema = `buyer(
    username VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    email VARCHAR(60) NOT NULL, 
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255)
)`;

const StatusSchema = `status(
    status_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(20) UNIQUE NOT NULL
)`;

const EarningSchema = `earning(
    earning_id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    withdrawable_amount FLOAT NOT NULL DEFAULT 0,
    total_earned FLOAT NOT NULL DEFAULT 0
)`;

const SellerSchema = `seller(
    seller_id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_no VARCHAR(20) UNIQUE NOT NULL,
    status_id INT,
    earning_id INT,
    FOREIGN KEY(username) REFERENCES buyer(username)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(status_id) REFERENCES status(status_id)
    ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY(earning_id) REFERENCES earning(earning_id)
    ON UPDATE CASCADE ON DELETE SET NULL
)`;

const ProductSchema = `product(
    product_id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    name VARCHAR(60) NOT NULL,
    price FLOAT NOT NULL CHECK(price > 0),
    quantity INT NOT NULL DEFAULT 1,
    description VARCHAR(255),
    rating INT NOT NULL DEFAULT 0,
    image VARCHAR(255) NOT NULL,
    add_time TIMESTAMP,
    seller_id INT,
    status_id INT,
    FOREIGN KEY (seller_id) REFERENCES seller(seller_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(status_id) REFERENCES status(status_id)
    ON UPDATE CASCADE ON DELETE SET NULL
)`;

const CategorySchema = `category(
    category_name VARCHAR(60) PRIMARY KEY UNIQUE NOT NULL
)`;

//Maps Products To Categories, It allows one product to have multiple categories
const ProductCategroySchema = `product_category(
    category_name VARCHAR(60) NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (category_name) REFERENCES category(category_name)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
    ON UPDATE CASCADE ON DELETE CASCADE
)`;

const OrderStatusSchema = `order_status(
    status_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    type VARCHAR(60) UNIQUE NOT NULL
)`;

//orders because order is a keyword in mysql
const OrderSchema = `orders(
    order_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    username VARCHAR(30) NOT NULL,
    status_id INT NOT NULL,
    total_price FLOAT NOT NULL,
    add_time TIMESTAMP,
    FOREIGN KEY (username) REFERENCES buyer(username)
    ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (status_id) REFERENCES order_status(status_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
)`;

//This mapping schema allows one order to have multiple products
const OrderProductSchema = `order_product(
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK(quantity > 0),
    price FLOAT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
)`;

// Schemas must be in order of their dependence
const Schemas = {
  admin: AdminSchema,
  buyer: BuyerSchema,
  status: StatusSchema,
  earning: EarningSchema,
  seller: SellerSchema,
  product: ProductSchema,
  category: CategorySchema,
  product_category: ProductCategroySchema,
  order_status: OrderStatusSchema,
  order: OrderSchema,
  order_product: OrderProductSchema,
};

module.exports = {
    AdminSchema,
    BuyerSchema,
    StatusSchema,
    EarningSchema,
    SellerSchema,
    ProductSchema,
    ProductCategroySchema,
    OrderStatusSchema,
    OrderSchema,
    OrderProductSchema,
    Schemas
}