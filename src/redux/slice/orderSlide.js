import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [
    ],
    selectedItemOrder: [],
    shippingAddress: {

    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: ''
}


export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state.orderItems.find(item => item?.product === orderItem?.product);
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find(item => item?.product === idProduct)
            const selectItemOrder = state?.selectedItemOrder?.find(item => item?.product === idProduct)
            itemOrder.amount++
            selectItemOrder.amount++
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find(item => item?.product === idProduct)
            const selectItemOrder = state?.selectedItemOrder?.find(item => item?.product === idProduct)
            selectItemOrder.amount > 1 && selectItemOrder.amount--
            itemOrder.amount > 1 && itemOrder.amount--
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const selectItemOrder = state?.selectedItemOrder?.find(item => item?.product === idProduct)
            state.orderItems = itemOrder
            state.selectedItemOrder = selectItemOrder
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item?.product))
            const selectItemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item?.product))
            state.orderItems = itemOrder
            state.selectedItemOrder = selectItemOrder
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const selectedItem = []
            state?.orderItems?.forEach((item) => {
                if (listChecked.includes(item.product)) {
                    selectedItem.push(item)
                }
            })
            state.selectedItemOrder = selectedItem
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, removeOrderProduct, selectedOrder, removeAllOrderProduct, increaseAmount, decreaseAmount } = orderSlide.actions

export default orderSlide.reducer