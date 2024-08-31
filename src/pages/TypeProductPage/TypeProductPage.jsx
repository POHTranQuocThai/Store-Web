import React, { Fragment } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'

function TypeProductPage() {
    const onChange = () => {

    }
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            <Row style={{ padding: '0 120px', background: '#efefef', flexWrap: 'nowrap', paddingTop: '10px' }}>
                <Col span={4} style={{ background: '#fff', marginRight: '20px', padding: '10px', borderRadius: '6px' }}><NavBarComponent /></Col>
                <Col span={20}>
                    <Col style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }} >
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </Col>
                    <Pagination style={{ textAlign: 'center', marginTop: '20px' }}
                        showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
                </Col>
            </Row>
        </div>
    )
}

export default TypeProductPage