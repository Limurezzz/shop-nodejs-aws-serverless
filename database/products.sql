CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products(
	id UUID DEFAULT uuid_generate_v4(),
    title TEXT,
	description TEXT,
    price INT,
    logo TEXT,
    PRIMARY KEY(id)
);

INSERT INTO products (title, description, price, logo)
values (
        'Product 1',
        'Product 1 description',
        1000,
        'https://r5.readrate.com/img/pictures/basic/792/792600/7926007/w800h317-76be96b9.jpg'
    ),
    (
        'Product 2',
        'Product 2 description',
        2000,
        'https://r2.readrate.com/img/pictures/basic/792/792600/7926008/w800h317-89405d1d.jpg'
    ),
    (
        'Product 3',
        'Product 3 description',
        3000,
        'https://r5.readrate.com/img/pictures/basic/792/792600/7926009/w800h317-da60182f.jpg'
    ),
    (
        'Product 4',
        'Product 4 description',
        4000,
        'https://r2.readrate.com/img/pictures/basic/792/792601/7926010/w800h317-04d81319.jpg'
    ),
    (
        'Product 5',
        'Product 5 description',
        5000,
        'https://r2.readrate.com/img/pictures/basic/792/792601/7926014/w800h317-a1bf3137.jpg'
    ),
    (
        'Product 6',
        'Product 6 description',
        6000,
        'https://r5.readrate.com/img/pictures/basic/792/792601/7926015/w800h317-8f4d4f25.jpg'
    )
