//Add Schemas to create Tables

export const BuyerSchema = `
    username UNIQUE NOT_NULL UNIQUE AUTO_INCREMENT VARCHAR(30), 
    first_name VARCHAR(30) NOT_NULL, 
    last_name VARCHAR(30) NOT_NULL, 
    email VARCHAR(60) NOT_NULL, 
    password VARCHAR(255) NOT_NULL
    `;
