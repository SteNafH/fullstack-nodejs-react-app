import React, { useEffect, useState } from 'react';
import { Product } from '../../../models/product.model';

function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const products = await fetch(`api/v1/products`)
                .then(response => response.json());

            setProducts(products);
        }

        void fetchProducts();
    }, []);


    return (<>
            <h1>Products {`(${products.length})`}</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </>
    );
}

export default Home;
