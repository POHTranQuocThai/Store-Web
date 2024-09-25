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
import { useRef, useState } from "react"
import { useEffect } from "react"
import Loading from "../../components/LoadingComponent/LoadingComponent"
import { useDebounce } from "../../hooks/useDebounce"

const HomePage = () => {
  const searchProduct = useSelector(state => state?.products?.search)
  const refSearch = useRef()
  const searchDebounce = useDebounce(searchProduct, 1000)
  const [stateProducts, setStateProducts] = useState([])
  const arr = ['TV', 'Tủ Lạnh', 'Lap Top']
  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search)
    if (search?.length > 0 || refSearch.current) {
      setStateProducts(res?.data)
    }
    return res
  }
  useEffect(() => {
    if (refSearch.current) {
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
  }, [searchDebounce])
  const { isLoading, data: products } = useQuery({
    queryKey: 'products',
    queryFn: fetchProductAll
  })
  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProducts(products?.data)
    }
  }, [products])

  return <Loading isLoading={isLoading}>
    <div style={{ padding: '0 120px' }}>
      <WrapperTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />
        })}
      </WrapperTypeProduct>
    </div>
    <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', width: '100%' }}>
      <SliderComponent arrImages={[slide1, slide2, slide3, slide4]} />
      <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {stateProducts?.map(product => {
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
          />
        })}
      </div>
      {/* <NavBarComponent /> */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <WrapperHoverButton textButton='Xem Thêm' type='outline' style={{
          border: '1px solid rgb(10, 104, 255)',
          color: 'rgb(10, 104, 255)',
          width: '240px',
          fontWeight: '500'
        }} />
      </div>
    </div>
  </Loading>
}

export default HomePage