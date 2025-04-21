import { useLoaderData } from 'react-router-dom';
import { Product as IProduct } from '../../interfaces/product.interface';

export function Product() {
    const data = useLoaderData() as IProduct;

    return (
        <>
            Product {data.name}
        </>
    );
}