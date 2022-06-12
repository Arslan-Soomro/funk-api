export const AdminSchema = `Admin(
    username VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL 
)`;

export const BuyerSchema = `buyer(
    username VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    email VARCHAR(60) NOT NULL, 
    password VARCHAR(255) NOT NULL
)`;

export const statusSchema = `status(
    status_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(20) UNIQUE NOT NULL
)`;

export const EarningSchema = `earning(
    earning_id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    withdrawable_amount FLOAT NOT NULL DEFAULT 0,
    total_earned FLOAT NOT NULL DEFAULT 0
)`;

export const SellerSchema = `seller(
    seller_id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL ,
    username VARCHAR(30) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_no VARCHAR(20) UNIQUE NOT NULL,
    status_id INT NOT NULL
    earning_id INT NOT NULL
    FOREIGN KEY(username) REFERENCES buyer(username)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(status_id) REFERENCES status(status_id)
    ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY(earning_id) REFERENCES earning(earning_id)
    ON UPDATE CASCADE ON DELETE SET NULL
)`;

export const ProductSchema = `product(
    product_id INT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
    name VARCHAR(60) NOT NULL,
    price FLOAT NOT NULL CHECK(price > 0),
    quantity INT NOT NULL DEFAULT 1,
    description VARCHAR(255),
    rating INT NOT NULL DEFAULT 0,
    image VARCHAR(255) NOT NULL,
    add_time TIMSTAMP,
    seller_id INT NOT NULL,
    status_id INT NOT NULL
    FOREIGN KEY seller_id REFERENCES seller(seller_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(status_id) REFERENCES status(status_id)
    ON UPDATE CASCADE ON DELETE SET NULL,
)`;

export const CategorySchema = `category(
    category_name VARCHAR(60) PRIMARY KEY UNIQUE NOT NULL,
)`;

//Maps Products To Categories, It allows one product to have multiple categories
export const ProductCategroySchema = `product_category(
    category_name VARCHAR(60) NOT NULL,
    product_id INT NOT NULL
    FOREIGN KEY category_name REFERENCES category(category_name)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY product_id REFERENCES product(product_id)
    ON UPDATE CASCADE ON DELETE CASCADE
)`;

export const OrderStatusSchema = `order_status(
    status_id INT PRIMARY KEY AUTO_INCEREMENT UNIQUE NOT NULL,
    type VARCHAR(60) UNIQUE NOT NULL
)`;

export const OrderSchema = `order(
    order_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    username VARCHAR(30) NOT NULL,
    status_id INT NOT NULL,
    total_price FLOAT NOT NULL,
    add_time TIMESTAMP,
    FOREIGN KEY username REFERENCES buyer(username)
    ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY status_id REFERENCES order_status(status_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
)`;

//This mapping schema allows one order to have multiple products
export const OrderProductSchema = `order_product(
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK(quantity > 0),
    price FLOAT NOT NULL,
    FOREIGN KEY order_id REFERENCES order(order_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY product_id REFERENCES product(product_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
)`;
