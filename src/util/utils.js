const cleanKeys = (data, deleteKeys) => {
    const res = {}
    Object.keys(data).forEach( key => {
        if(!deleteKeys.includes(key)){
            res[key] = data[key]
        }
    })
    return res;
}

module.exports = {
    cleanKeys
}
