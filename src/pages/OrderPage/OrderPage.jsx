
import { Row, Col, Checkbox, Image, Button } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } from '../../redux/slice/orderSlide'
import { useState } from 'react';

const OrderPage = () => {
  const order = useSelector(state => state.order)
  const [listChecked, setListChecked] = useState([])
  const dispatch = useDispatch()

  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }))
    } else if (type === 'decrease') {
      dispatch(decreaseAmount({ idProduct }))
    }
  }
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }
  const handleCheckedProductAll = (e) => {
    if (e.target.checked) {
      const newIsCheckedAll = []
      order?.orderItems?.forEach((item) => {
        newIsCheckedAll.push(item?.product)
      })
      setListChecked(newIsCheckedAll)
    } else {
      setListChecked([])
    }
  }
  const onChange = (e) => {
    console.log('🚀 ~ onChange ~ e.target.value:', e.target.value)
    if (listChecked.includes(e.target.value)) {
      const newIsChecked = listChecked.filter(item => item !== e.target.value)
      setListChecked(newIsChecked)
    } else {
      setListChecked(
        [...listChecked, e.target.value]
      )
    }
    console.log('🚀 ~ onChange ~ listChecked:', listChecked)
  }
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px 0' }}>
      <p style={{ padding: '0 120px', fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>Giỏ hàng</p>

      <Row justify="center" style={{ maxWidth: '1250px', margin: '0 auto' }}>
        {/* Cột Giỏ hàng */}
        <Col xs={24} md={17} style={{ background: '#fff', padding: '20px', marginRight: '20px', borderRadius: '8px' }}>
          <Row style={{ fontWeight: '500', marginBottom: '20px' }} align="middle">
            <Col span={1}>
              <Checkbox onChange={handleCheckedProductAll} checked={listChecked?.length === order?.orderItems.length} />
            </Col>
            <Col span={10}>
              Tất cả (<span>{order?.orderItems?.length}</span> sản phẩm)
            </Col>
            <Col span={4} style={{ paddingLeft: '20px' }}>Đơn giá</Col>
            <Col span={4} style={{ paddingLeft: '30px' }}>Số lượng</Col>
            <Col span={4}>Thành tiền</Col>
            <Col span={1}>
              <DeleteOutlined onClick={handleRemoveAllOrder} />
            </Col>
          </Row>

          {/* Sản phẩm mẫu */}
          {order?.orderItems?.map((order) => {
            return <Row align="middle" style={{ padding: '15px 0', borderTop: '1px solid #f0f0f0' }}>
              <Col span={1}>
                <Checkbox onChange={onChange} value={order.product} checked={listChecked.includes(order?.product)} />
              </Col>
              <Col span={10}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image src={order.image} style={{ width: '80px', height: '80px' }} />
                  {/* Điều chỉnh mô tả sản phẩm với ellipsis */}
                  <p style={{ margin: '0px 10px 0 5px', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '16px', textOverflow: 'ellipsis', maxWidth: '260px' }}>
                    {order?.name}
                  </p>
                </div>
              </Col>
              <Col span={4} style={{ paddingLeft: '20px' }}>{order?.price}</Col>
              <Col span={4}>
                <Button onClick={() => handleChangeCount('increase', order?.product)}><PlusOutlined style={{ color: '#000', fontSize: '10px' }} /></Button>
                <WrapperInputNumber readOnly
                  style={{ width: '35px' }} min={1} max={100} defaultValue={1} onChange={handleChangeCount} value={order?.amount} />
                <Button onClick={() => handleChangeCount('decrease', order?.product)}><MinusOutlined style={{ color: '#000', fontSize: '10px' }} /></Button>
              </Col>
              <Col span={4}>{order?.price * order?.amount}</Col>
              <Col span={1}>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
              </Col>
            </Row>
          })}
        </Col>

        {/* Cột Tổng tiền */}
        <Col xs={24} md={6} style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
          <Row justify="space-between" style={{ marginBottom: '10px' }}>
            <Col>Tạm tính</Col>
            <Col>2.000.000 VND</Col>
          </Row>
          <Row justify="space-between" style={{ marginBottom: '10px' }}>
            <Col>Giảm giá</Col>
            <Col>0 VND</Col>
          </Row>
          <Row justify="space-between" style={{ marginBottom: '10px' }}>
            <Col>Thuế</Col>
            <Col>0 VND</Col>
          </Row>
          <Row justify="space-between" style={{ marginBottom: '10px' }}>
            <Col>Phí giao hàng</Col>
            <Col>0 VND</Col>
          </Row>
          <Row justify="space-between" align="middle" style={{ paddingTop: '20px' }}>
            <Col style={{ fontWeight: '600' }}>Tổng tiền</Col>
            <Col>
              <span style={{ fontSize: '25px', fontWeight: '600', color: 'red' }}>2.000.000 VND</span>
              <p style={{ fontSize: '12px', fontWeight: '500' }}>(Đã bao gồm VAT nếu có)</p>
            </Col>
          </Row>
          <ButtonComponent style={{ marginTop: '20px', background: 'red', width: '100%' }} styleTextBtn={{ color: '#fff' }} textButton={'Thanh toán'}></ButtonComponent>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
