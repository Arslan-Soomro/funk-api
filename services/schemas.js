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
    category_id INT NOT NULL,
    status_id INT NOT NULL
    FOREIGN KEY seller_id REFERENCES seller(seller_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY category_id REFERENCES category(category_id),
    ON UPDATE CASCADE ON DELETE SE NULL,
    FOREIGN KEY(status_id) REFERENCES status(status_id)
    ON UPDATE CASCADE ON DELETE SET NULL,
)`;
