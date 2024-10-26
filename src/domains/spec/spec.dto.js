export const bcDTO = (data) => {
    return {minimum: data[0][0].credit, received: data[1][0].sum, subject: data[2]};
}