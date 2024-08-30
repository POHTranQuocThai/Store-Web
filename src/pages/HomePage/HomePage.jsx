import SliderComponent from "../../components/SliderComponent/SliderComponent"
import TypeProduct from "../../components/TypeProduct/TypeProduct"
import { WrapperTypeProduct } from "./style"
import slide1 from '../../assets/images/silde1.png.webp'
import slide2 from '../../assets/images/slide2.jpg.webp'
import slide3 from '../../assets/images/slide3.png.webp'
import slide4 from '../../assets/images/slide4.jpg.webp'
const HomePage = () => {
  const arr = ['TV', 'Tủ Lạnh', 'Lap Top']
  return (<>
    <div style={{ padding: '0 120px' }}>
      <WrapperTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />
        })}
      </WrapperTypeProduct>
    </div>
    <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px' }}>
      <SliderComponent arrImages={[slide1, slide2, slide3, slide4]} /></div>
  </>
  )

}

export default HomePage