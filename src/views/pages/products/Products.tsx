import React, { useEffect, useState } from 'react';
import { Product } from '../../../models/product.model';
import { useAuth } from '../../hooks';

function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const auth = useAuth();

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch(`api/v1/products`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                }
            })
                .then(response => response.json());

            if (response.status !== 'success')
                return;

            setProducts(response.data.products);
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
