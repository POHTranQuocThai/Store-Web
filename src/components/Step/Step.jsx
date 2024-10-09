import { Steps } from "antd"

export const Step = ({ current = 1, items = [] }) => {
    return <Steps
        current={current}
        items={items}
    />
}