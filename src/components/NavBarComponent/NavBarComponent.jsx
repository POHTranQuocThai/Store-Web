import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'

function NavBarComponent() {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue>{option}</WrapperTextValue>
                })
            case 'checkbox':
                return <Checkbox.Group
                    style={{
                        width: '100%', display: 'flex', flexDirection: 'column', gap: '12px'
                    }}
                >
                    {options.map((option) => {
                        return <Checkbox style={{ marginLeft: '0' }} value={option.value}>{option.lable}</Checkbox>
                    })}
                </Checkbox.Group>
            case 'star':
                return options.map((option) => {
                    return <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                        <Rate style={{ fontSize: '12px' }} allowHalf defaultValue={option} />
                        <span>từ {option} sao</span>
                    </div>
                })
            case 'price':
                return options.map(option => {
                    return <div style={{
                        padding: '4px', color: 'rgb(56,56,61)', borderRadius: '10px', backgroundColor: 'rgb(238, 238, 238)', width: 'fit-content', marginTop: '10px'
                    }}>{option}</div>

                })
            default:
                return {}
        }
    }
    return (
        <div>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Tủ lạnh', 'TV', 'MAYGIAT'])}
            </WrapperContent>
            <WrapperContent> {renderContent('checkbox', [{ value: 'a', lable: 'A' }, { value: 'b', lable: 'B' }, { value: 'c', lable: 'C' }])}</WrapperContent>
            <WrapperContent >{renderContent('star', [3, 4, 5])}</WrapperContent>
            <WrapperContent >{renderContent('price', ['dưới 40.000', 'trên 60.000'])}</WrapperContent>
        </div>
    )
}

export default NavBarComponent