CREATE TABLE IF NOT EXISTS stocks(
   id UUID DEFAULT uuid_generate_v4(),
   product_id UUID,
   count INT,
   PRIMARY KEY(id),
   CONSTRAINT fk_product
      FOREIGN KEY(product_id) 
	  REFERENCES products(id)
	  ON DELETE CASCADE
);

-- adding values in stock table --
WITH val AS(
	select product_id, count from 
        (select row_number() over(), id as product_id from products) p
    join
        (select count, row_number() over() from unnest('{10, 20, 30, 40, 50, 60}'::int[]) as count) c
    on c.row_number=p.row_number
)
INSERT INTO stocks (product_id, count)
SELECT product_id, count
FROM val;
