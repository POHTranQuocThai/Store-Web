import React from 'react'
import { useNavigate } from 'react-router-dom'

function TypeProduct({ name }) {
    const navigate = useNavigate()

    const normalizeType = (type) => {
        return type
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/ /g, '-')
    }

    const handleTypeProduct = (type) => {
        const normalizedType = normalizeType(type)
        navigate(`/product/${normalizedType}`, { state: type })
    }

    return (
        <div style={{ padding: '0 10px', cursor: 'pointer' }} onClick={() => handleTypeProduct(name)}>
            {name}
        </div>
    )
}

export default TypeProduct
