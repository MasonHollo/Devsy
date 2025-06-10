import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../redux/product";


const Products = () => {
    const dispatch = useDispatch();
    const product = useSelector((state: any) => state.product.allProducts);

    useEffect(() => {
        dispatch(getAllProductsThunk());
    }, [dispatch]);



    return (

        <div>
            {product && product.length > 0 ? (
                product.map((product: any) => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Description: ${product.description}</p>

                        {product.ProductImages && product.ProductImages.length > 0 ? (
                            product.ProductImages.map((img: any) => (
                                <img
                                    key={img.id}
                                    src={img.url.trim()}
                                    alt={`${product.name} image`}
                                    style={{ width: '200px', marginBottom: '5px' }}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>

                ))
            ) : (
                <p>Loading products...</p>
            )}
        </div>

    )

}

export default Products;
