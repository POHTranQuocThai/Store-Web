import React from 'react'
import { useNavigate } from 'react-router-dom'

function TypeProduct({ name }) {
    const navigate = useNavigate()
    const handleTypeProduct = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')?.replace(/ /g, '-')}`, { state: type })
    }
    return (
        <div style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleTypeProduct(name)}>{name}</div>
    )
}

export default TypeProduct