export const bcDTO = (data) => {
    const minimum = data[0][0].credit
    const received = data[1][0].sum
    const text = data[2][0].content
    return {minimum: minimum, received: received, content: text, subject: data[3]};
}

export const mfDTO = (data) => {
    const minimum = data[0][0].sum
    const received = data[1][0].sum
    const text = data[2]
    return {minimum: minimum, received: received, content: text, subject: data[3]};
}

export const majorDTO = (data) => {
    const minimum = data[0][0].credit
    const received = data[1][0].sum
    const text = data[2]
    return {minimum: minimum, received: received, content: text, subject: data[3]};
}

export const typeDTO = (data) => {
    return {major_type: data[0].major_type};
}

export const kcDTO = (data) => {
    const minimum = data[0][0].credit
    const received = data[1][0].sum
    const text = data[2][0].content
    return {minimum: minimum, received: received, content: text, subject: data[3]};
}