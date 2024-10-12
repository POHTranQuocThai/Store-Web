import { Row } from "antd";
import * as OrderService from '../../services/OrderService'
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
    const user = useSelector(state => state.users)
    const fetchMyOrder = async () => {
        const res = await OrderService.getDetailsOrderById(user?.id, user?.access_token)
        console.log('🚀 ~ fetchMyOrder ~ res:', res)
        return res.data
    }
    const queryOrder = useQuery({
        queryKey: ['orders'], queryFn: fetchMyOrder, enabled: !!(user?.id && user?.access_token)
    })
    const { isLoading, data: orders } = queryOrder
    console.log('🚀 ~ MyOrderPage ~ fetchMyOrder:', orders)
    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px 0' }} >
            <Row justify="center" style={{ maxWidth: '1250px', margin: '0 auto' }}>
                ádsdada
            </Row>
        </div >
    )
};
export default MyOrderPage
