import SliderComponent from "../../components/SliderComponent/SliderComponent"
import TypeProduct from "../../components/TypeProduct/TypeProduct"
import { WrapperHoverButton, WrapperTypeProduct } from "./style"
import slide1 from '../../assets/images/silde1.png.webp'
import slide2 from '../../assets/images/slide2.jpg.webp'
import slide3 from '../../assets/images/slide3.png.webp'
import slide4 from '../../assets/images/slide4.jpg.webp'
import CardComponent from "../../components/CardComponent/CardComponent"
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
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
    <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', width: '100%' }}>
      <SliderComponent arrImages={[slide1, slide2, slide3, slide4]} />
      <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />

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

  </>
  )

}

export default HomePage