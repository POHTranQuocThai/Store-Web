import SliderComponent from "../../components/SliderComponent/SliderComponent"
import TypeProduct from "../../components/TypeProduct/TypeProduct"
import { WrapperHoverButton, WrapperTypeProduct } from "./style"
import slide1 from '../../assets/images/silde1.png.webp'
import slide2 from '../../assets/images/slide2.jpg.webp'
import slide3 from '../../assets/images/slide3.png.webp'
import slide4 from '../../assets/images/slide4.jpg.webp'
import CardComponent from "../../components/CardComponent/CardComponent"
import * as ProductService from '../../services/ProductService'
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../../components/LoadingComponent/LoadingComponent"
import { useDebounce } from "../../hooks/useDebounce"

const HomePage = () => {
  const searchProduct = useSelector(state => state?.products?.search)
  const searchDebounce = useDebounce(searchProduct, 1000)
  const [limit, setLimit] = useState(6)
  const [typeProduct, setTypeProduct] = useState([])

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    setTypeProduct(res?.data)
  }
  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)
    return res

  }
  const { isLoading, data: products, isPreviousData } = useQuery({
    queryKey: ['products', limit, searchDebounce],  // Query key để định danh query dựa trên limit và searchDebounce
    queryFn: fetchProductAll,                       // Hàm fetch dữ liệu
    retry: 3,                                       // Số lần thử lại khi gặp lỗi
    retryDelay: 1000,                               // Thời gian chờ giữa các lần thử lại (1 giây)
    keepPreviousData: true                          // Giữ dữ liệu cũ trong khi chờ dữ liệu mới
  });

  return <Loading isLoading={isLoading}>
    <div style={{ padding: '0 120px' }}>
      <WrapperTypeProduct>
        {typeProduct?.map((item) => {
          return <TypeProduct name={item} key={item} />
        })}
      </WrapperTypeProduct>
    </div>
    <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', width: '100%' }}>
      <SliderComponent arrImages={[slide1, slide2, slide3, slide4]} />
      <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {products?.data?.map(product => {
          return <CardComponent
            key={product._id}
            countInStock={product.countInStock}
            description={product.description}
            image={product.image}
            name={product.name}
            price={product.price}
            rating={product.rating}
            discount={product.discount}
            selled={product.selled}
            type={product.type}
            id={product._id}
          />
        })}
      </div>
      {products?.data?.length !== 0 && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <WrapperHoverButton textButton='Xem Thêm' type='outline' styleBtn={{
          border: '1px solid rgb(10, 104, 255)',
          width: '240px',
          fontWeight: '500',
          color: `${products?.totalProduct === products?.data?.length ? '#ccc' : 'rgb(11,116,229'}`
        }} disabled={products?.totalProduct === products?.data?.length || products?.totalPage === 1}
          styleTextBtn={{ fontWeight: 600, color: products?.totalProduct === products?.data?.length && '#fff' }}
          onClick={products?.totalProduct !== products?.data?.length
            ? () => setLimit((prev) => prev + 6)
            : null} />
      </div>}
    </div>
  </Loading>
}

export default HomePage