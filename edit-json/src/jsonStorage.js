const fs = require('fs-extra')
const path = require('path')

// class Storage {
//     fileName;
//     constructor(fileN) {
//         this.fileName = fileN;
//     }
//     get(key) {
//         let pth = this.fileName;
//         if (fs.existsSync(pth)) {
//             let rawData = fs.readFileSync(pth)
//             if (rawData) {
//                 let data = JSON.parse(rawData)
//                 return data[key]
//             } else return null
//         } else {
//             return null
//         }
//     }
//     set(key, value) {
//         let pth = this.fileName;
//         let data = {}
//         if (fs.existsSync(pth)) {
//             let rawdata = fs.readFileSync(pth)
//             if (rawdata != '') data = JSON.parse(rawdata)
//         }
//         data[key] = value
//         fs.writeFileSync(pth, JSON.stringify(data))
//         return true
//     }
// }
//
// module.exports = { Storage };
class JsonStorage {
    filepath;

    constructor (filepath) {
        this.filepath = filepath;
    }

    getJson () {
        let path = this.filepath;
        return fs.readJsonSync(path, {charset: 'utf8'}, (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            return data;
        });
    }

    setJson (path, data) {
        fs.writeJsonSync(path, data, {charset: 'utf8'}, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });
    }
}

module.exports = {JsonStorage};