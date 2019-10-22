const epochToString = (epochDate) => {
    const date = new Date(epochDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return (year + "-" + month + "-" + day)

}

const stringToEpoch = stringDate => {
    const date = stringDate.split('-').map(x => parseInt(x, 10))
    return new Date(...date).getTime()
}

module.exports = {
    epochToString,
    stringToEpoch
}