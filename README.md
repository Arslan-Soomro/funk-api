# Funkaraana

## API DOCS

---

### Glossary

- **?** - attribute is optional

- **||** - Acts as logical *or*

- 



---

### ROUTES

#### Buyer

*::/buyer*

**POST** :: /signup

*Body*

    { username, first_name, last_name, email, password, image }

*Returns*

    { message }

*Error*

    { message }

**POST** :: /signin

*Body*

    { username, password }

*Returns* 

    { message, token, first_name, last_name, email, image }

*Error*

    { message }

**GET** :: /signin

*Headers*

    { token }

*Returns*

    { message, first_name, last_name, email, image }

*Error*

    { message }

**GET** :: /status

*Headers*

    { token }

*Returns*

    { message, status }

*Error*

    { message }

**PUT** :: /update

*Headers*

    { token }

*Body*

    { first_name || last_name || email || password || image }

*Returns*

    { message }

*Error*

    { message }

**DELETE** :: /delete

*Headers*

    { token }

*Returns*

    { message }

*Error*

    { message }

**POST** :: /register

*Headers*

    { token }

*Body*

    { dob, contact_no, country, city, location, province }

*Returns*

    { message, id, username, status }

*Error*

    { message }

---

### Seller

*:: /seller*

**GET** :: /

*Paremeters*

    { status **?** }

*Headers*

    { token }

*Returns*

    { id, user_name, dob, contact_no, status, earning_id, location_id, address, message }

*Error*

    { message }

*Note*

    If status is provided then this route becomes admin specific

**PUT** :: /

*Headers*

    { token }

*Body*

    { first_name || last_name || email || password || contact_no || address || image }

*Returns*

    { message }

*Error*

    { message }

**PUT** :: /status

*Headers*

    { token }

*Body*

    { status }

*Returns*

    { message }

*Error*

    { message }

*Note*

    Admin Specific Route 

**DELETE** :: /

*Headers*

    { token }

*Returns*

    { message }

*Error*

    { message }

---

### Product

:: /product

**POST** :: /add

*Headers*

    { token }

*Body*

    { name, price, category, quantity, description, rating, image }

*Returns*

    { message, status }    

*Error*

    { message }

**PUT** :: /update

*Headers*

    { token }

*Body*

    { name || price || category || quantity || description || rating || image }

*Returns*

    { message }

*Error*

    { message }

*Note*

    If seller.id == product.seller_id then exclude rating else only update rating.

**PUT** :: /status

*Headers*

    { token }

*Body*

    { status }

*Returns*

    { message }

*Error*

    { message }

*Note*

    Admin Specific Route

**DELETE** :: /delete

*Headers*

    { token }

*Body*

    { id }

- id refers to product id

*Returns*

    { message }

*Error*    

    { message }

*Note*

    Delete only if seller.id == product.seller_id

**GET** :: /

*Parameters*

    { cat }

*Returns*

    { category || status, data: [ { id, name, price, quantity, description, category, rating, image } ] }

*Error*

    { message }

**GET** :: / || /popular

*Returns*

    { data: [ { id, name, price, quantity, category, description, rating, image } ] }

*Error*

    { message }

*Note*

    By default most recent products are returned but if route is popular than most     popular that is products with most ratings are returned

**GET** :: /seller

*Headers*

    { token }

*Returns*

    { data: [ { id, name, price, quantity, category, description, rating, image, status } ] }

*Error*

    { message }

*Note*

    Verify Seller and then send back its products only

**GET** :: /status

*Headers*

    { token }

*Parameters*

    { status }

*Returns*

     { data: [ { id, name, price, quantity, category, description, rating, image, status } ] }

*Error*

    { message }

*Note*

    Admin Specific Route

---

### Order

*:: /order*

**POST** :: /add

*Headers*

    { token }

*Body*

    { product_id, quantity, timstamp }

*Returns*

    { order_id, product_id, product_name, status, price, timestamp }

*Error*

    { message }

**POST** :: /cancel

*Headers*

    { token }

*Body*

    { order_id }

*Returns*

    { message }

*Error*

    { message }

*Note*

    if order.status == "pending" only then orders are cancellable.

**PUT** :: /status

*Headers*

    { token }

*Body*

    { status }

*Returns*

    { message }

*Error*

    { message }

*Note*

    Admin Specific Route

**GET** :: /buyer

*Headers*

    { token }

*Returns*

    { data: [{ order_id, order_status, timestamp, username, product_id, name, price, quantity, category,     description, rating, image }] }

- Quantity refers to the quantity of the products bought not the total products that are available to buy.

*Error*

    { message }

*Note*

    We return the orders that the buyer has placed

**GET** :: /seller

*Headers*

    { token }

*Returns*

        { data: [{ order_id, order_status, timestamp, username,  product_id, name, price, quantity, category,     description, rating, image }] }

- Quantity refers to the quantity of the products bought not the total products that are available to buy.

*Error*

    { message }

*Note*

    We return the orders that are placed for the products of that seller

**GET** :: /status

*Headers*

    { token }

*Parmeters*

    { status }

*Returns*

    { data: [{ order_id, order_status, timestamp, username, product_id, name, price,     quantity, category, description, rating, image }] }

- Quantity refers to the quantity of the products bought not the total products that are available to buy.

*Error*

    { message }

*Note*

    Order details are returned if the token points to an admin only

**GET** :: /

*Headers*

    { token }

*Parameters*

    { order_id }

*Returns*

    { order_id, order_status, timestamp, username, product_id, name, price, quantity, category, description, rating, image }

- Quantity refers to the quantity of the products bought not the total products that are available to buy.

*Error*

    { message }

*Note*

    Order details are returned back only if the token refers to a seller or buyer who is     involved in the order or it is admin.

---

### Earning

*::/earning*

**PUT** :: /update

*Headers*

    { token }

*Body*

    { amount }

*Returns*

    { withdrawable_amount }

*Error*

    { message }

*Note*

- This route is admin specific, so token must refer to an admin

- amount provided should be added to withdrawable_amount as well as total_amount

**PUT** :: /withdraw

*Headers*

    { token }

*Body*

    { amount }

*Returns*

    { withdrawable_amount }

*Error*

    { message }

*Note*

- amount should be deducted from withdrawable amount only

**GET** :: /

*Headers*

    { token }

*Returns*

    { earning_id, withdrawable_amount, total_earned }    

---

### Admin

*:: /admin*

**POST** :: /signin

*Body*

    { username, password }

*Returns*

    { message, token, username }

*Error*

    { message } 
