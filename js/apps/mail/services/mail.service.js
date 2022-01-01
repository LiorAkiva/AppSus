
// import { utilService } from './util.service.js'
// import { storageService } from './storage.service.js'

export const mailService = {
    query,
    queryWithDelay,
    removeMail,
    saveMail,
    getMailById,
    getNextMailId,
    getNumOfUnReadMails,
    composeMail
}

const KEY = 'mailDB';
// var gVendors = ['audi', 'fiat', 'suzuki', 'honda', 'mazda']

// _createMails();

function query(filterBy = null) {
    // const mails = _loadMailsFromStorage()
    if (!filterBy) return Promise.resolve(mails)
    // const filteredMails = _getFilteredMails(mails, filterBy)
    // return Promise.resolve(filteredMails)

}

function getNextMailId(mailId) {
    const mails = _loadMailsFromStorage()
    const mailIdx = mails.findIndex(mail => mail.id === mailId)
    let nextMailIdx = mailIdx + 1
    if (nextMailIdx === mails.length) nextMailIdx = 0
    return mails[nextMailIdx].id
}

function queryWithDelay(filterBy = null) {
    const mails = _loadMailsFromStorage()
    if (!filterBy) {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000, mails)
        })
    } else {
        const filteredMails = _getFilteredMails(mails, filterBy)
        return new Promise((resolve) => {
            setTimeout(resolve, 1000, filteredMails)
        })
    }
}

function _getFilteredMails(mails, filterBy) {
    let { vendor, minSpeed, maxSpeed } = filterBy //
    minSpeed = minSpeed ? minSpeed : 0 //
    maxSpeed = maxSpeed ? maxSpeed : Infinity //
    return mails.filter(mail => {
        return mail.vendor.includes(vendor) && mail.speed >= minSpeed && mail.speed <= maxSpeed
    })
}

function saveMail(mailToSave) {
    return mailToSave.id ? _updateMail(mailToSave) : _addMail(mailToSave)
}

function _addMail(mailToSave) {
    let mails = _loadMailsFromStorage()
    var mail = _createMail(mailToSave)
    mails = [mail, ...mails]
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function _updateMail(mailToSave) {
    const mails = _loadMailsFromStorage()
    var mailIdx = mails.findIndex(function (mail) {
        return mail.id === mailToSave.id;
    })
    mails[mailIdx] = mailToSave
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function removeMail(mailId) {
    let mails = _loadMailsFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveMailsToStorage(mails);
    return Promise.resolve()
}


function getMailById(mailId) {
    const mails = _loadMailsFromStorage()
    var mail = mails.find(function (mail) {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function composeMail() {
    console.log('composeMail was activated')
    
}


// function _createMail(mailToSave) {
//     if (!mailToSave.speed) mailToSave.speed = utilService.getRandomIntInclusive(1, 200)
//     return {
//         id: utilService.makeId(),
//         ...mailToSave,
//         desc: utilService.makeLorem(),
//         ctg: Math.random() <= 0.6 ? 'bestSelling' : ''
//     }
// }

function getNumOfUnReadMails(mails) {
    let counter = 0
    mails.forEach(mail => {
        if (!mail.isRead) counter++
    })
    return counter

}


// function _createMails() {
//     var mails = _loadMailsFromStorage()
//     if (!mails || !mails.length) {
//         mails = []
//         gVendors.forEach(vendor => {
//             const mailToSave = { vendor }
//             mails.push(_createMail(mailToSave))
//         })
//     }
//     _saveMailsToStorage(mails);
// }

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const mails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'aibi@natan.com'
    },
    {
        id: 'e102',
        subject: 'you Miss !',
        body: 'Would love to catch sideways sometimes',
        isRead: true,
        sentAt: 1551133930595,
        to: 'momo@momo.com',
        from: 'artishok@yerushalmi.com'
    },
    {
        id: 'e103',
        subject: 'Miss Pigi!',
        body: 'Would love to catch down sometimes',
        isRead: false,
        sentAt: 1551133930596,
        to: 'bill@kill.ocm',
        from: 'momo@momo.com'
    }
]