
import { Row, Col, Checkbox, Image, Button } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } from '../../redux/slice/orderSlide'
import { useMemo, useState } from 'react';
import { convertPrice } from '../../utils/utils';

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
    if (listChecked.includes(e.target.value)) {
      const newIsChecked = listChecked.filter(item => item !== e.target.value)
      setListChecked(newIsChecked)
    } else {
      setListChecked(
        [...listChecked, e.target.value]
      )
    }
  }
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }
  const provisional = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      return total + (cur?.amount * cur?.price)
    }, 0)
    return result
  }, [order])
  const discountPrice = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      return total + (cur?.discount * cur?.amount)
    }, 0)
    return Number(result) || 0
  }, [order])
  const diliveryPrice = useMemo(() => {
    if (provisional > 500000) {
      return 30000
    } else {
      return 20000
    }
  }, [order])
  const totalPrice = useMemo(() => {
    return provisional - discountPrice + diliveryPrice
  }, [provisional, discountPrice, diliveryPrice])
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
              <Col span={4} style={{ paddingLeft: '20px' }}>{convertPrice(order?.price)}</Col>
              <Col span={4}>
                <Button onClick={() => handleChangeCount('increase', order?.product)}><PlusOutlined style={{ color: '#000', fontSize: '10px' }} /></Button>
                <WrapperInputNumber readOnly
                  style={{ width: '35px' }} min={1} max={100} defaultValue={1} onChange={handleChangeCount} value={order?.amount} />
                <Button onClick={() => handleChangeCount('decrease', order?.product)}><MinusOutlined style={{ color: '#000', fontSize: '10px' }} /></Button>
              </Col>
              <Col span={4}>{convertPrice(order?.amount * order?.price)}</Col>
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
            <Col>{convertPrice(provisional)}</Col>
          </Row>
          <Row justify="space-between" style={{ marginBottom: '10px' }}>
            <Col>Giảm giá</Col>
            <Col>{`${discountPrice} %`}</Col>
          </Row>
          <Row justify="space-between" style={{ marginBottom: '10px' }}>
            <Col>Phí giao hàng</Col>
            <Col>{convertPrice(diliveryPrice)}</Col>
          </Row>
          <Row justify="space-between" align="middle" style={{ paddingTop: '20px' }}>
            <Col style={{ fontWeight: '600' }}>Tổng tiền</Col>
            <Col>
              <span style={{ fontSize: '25px', fontWeight: '600', color: 'red' }}>{convertPrice(totalPrice)}</span>
              <p style={{ fontSize: '12px', fontWeight: '500' }}>(Đã bao gồm VAT nếu có)</p>
            </Col>
          </Row>
          <ButtonComponent style={{ marginTop: '20px', background: 'red', width: '100%', height: '40px' }} styleTextBtn={{ color: '#fff' }} textButton={'Thanh toán'}></ButtonComponent>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
