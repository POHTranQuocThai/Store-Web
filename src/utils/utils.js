
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export const renderOptions = (arr) => {
    let result = []
    if (arr) {
        result = arr?.map((opt) => {
            return {
                value: opt,
                label: opt
            }
        })
    }
    result.push({
        label: 'Thêm type',
        value: 'add_type'
    })
    return result
}
export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result}đ`
    } catch (error) {
        return null
    }
}