
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    // queryWithDelay,
    // removeMail,
    // saveMail,
    getMailById,
    // getNextMailId,
    getNumOfUnReadMails,
    // composeMail,
    createMail,
    test,
    removeMail,
    toggleStar
}

function toggleStar(mailId) {
    mails = mails.map((mail) => {
        return (mail.id !== mailId) ? mail : { ...mail, isStarred: !mail.isStarred }
    })
    return Promise.resolve(mails);
}

function removeMail(mailId) {
    // console.log('ev: ',ev.target.getAttribute('data-id'))
    // const mailId = ev.target.getAttribute('data-id')
    // let mails = _loadMailsFromStorage()
    // console.log('mails before filtering: ', mails)

    mails = mails.filter((mail) => mail.id !== mailId);

    // console.log('mails after filtering: ', mails)
    // _saveMailsToStorage(mails);
    return Promise.resolve(mails);
}


function test() {

    console.log('test is successful')
}
const KEY = 'mailDB';

let mails = [
    {
        id: 'e101HY',
        from: 'aibi@natan.com',
        to: 'user@appsus.com',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        createdAt: 1551133930591
    },
    {
        id: 'HU67gh',
        from: 'artishok@yerushalmi.com',
        to: 'user@appsus.com',
        subject: 'you Miss !',
        body: 'Would love to catch sideways sometimes',
        isRead: true,
        sentAt: 1551133930595,
        createdAt: 1551133930591,
        isStarred: true
    },
    {
        id: 'jh45GH',
        from: 'user@appsus.com',
        to: 'bill@kill.ocm',
        subject: 'Miss Pigi is dead',
        body: 'Would love to catch down sometimes',
        isRead: false,
        sentAt: 1551133930596,
        createdAt: 1551133930591
    }
]
const readyMdeMails = [
    {
        id: 'e101HY',
        from: 'aibi@natan.com',
        to: 'momo@momo.com',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        createdAt: 1551133930591
    },
    {
        id: 'HU67gh',
        from: 'artishok@yerushalmi.com',
        to: 'momo@momo.com',
        subject: 'you Miss !',
        body: 'Would love to catch sideways sometimes',
        isRead: true,
        sentAt: 1551133930595,
        createdAt: 1551133930591
    },
    {
        id: 'jh45GH',
        from: 'momo@momo.com',
        to: 'bill@kill.ocm',
        subject: 'Miss Pigi!',
        body: 'Would love to catch down sometimes',
        isRead: false,
        sentAt: 1551133930596,
        createdAt: 1551133930591
    }
]



function query(filterBy = null) {
    console.log(' i am in query')
    // const mails = _loadMailsFromStorage()
    if (!filterBy) return Promise.resolve(mails)
    const filteredMails = _getFilteredMails(mails, filterBy)
    return Promise.resolve(filteredMails)
}

function _getFilteredMails(mails, filterBy) {

    return mails.filter(mail => {
      
        switch (filterBy) {
            case 'inbox':
                return mail.from !== loggedinUser.email
                break
            case 'sent':
                return mail.from === loggedinUser.email
                break
            case 'starred':
                return mail.isStarred
                break
            case 'draft':
                return mail.isDraft
                break
        }
      
    })
}

// function getNextMailId(mailId) {
//     const mails = _loadMailsFromStorage()
//     const mailIdx = mails.findIndex(mail => mail.id === mailId)
//     let nextMailIdx = mailIdx + 1
//     if (nextMailIdx === mails.length) nextMailIdx = 0
//     return mails[nextMailIdx].id
// }

// function queryWithDelay(filterBy = null) {
//     const mails = _loadMailsFromStorage()
//     if (!filterBy) {
//         return new Promise((resolve) => {
//             setTimeout(resolve, 1000, mails)
//         })
//     } else {
//         const filteredMails = _getFilteredMails(mails, filterBy)
//         return new Promise((resolve) => {
//             setTimeout(resolve, 1000, filteredMails)
//         })
//     }
// }


// function saveMail(mailToSave) {
//     return mailToSave.id ? _updateMail(mailToSave) : _addMail(mailToSave)
// }

// function _addMail(mailToSave) {
//     let mails = _loadMailsFromStorage()
//     var mail = _createMail(mailToSave)
//     mails = [mail, ...mails]
//     _saveMailsToStorage(mails);
//     return Promise.resolve()
// }

// function _updateMail(mailToSave) {
//     const mails = _loadMailsFromStorage()
//     var mailIdx = mails.findIndex(function (mail) {
//         return mail.id === mailToSave.id;
//     })
//     mails[mailIdx] = mailToSave
//     _saveMailsToStorage(mails);
//     return Promise.resolve()
// }

// function removeMail(mailId) {
//     // let mails = _loadMailsFromStorage()
//     mails = mails.filter(mail => mail.id !== mailId)
//     // _saveMailsToStorage(mails);
//     return Promise.resolve()
// }


function getMailById(mailId) {
    // const mails = _loadMailsFromStorage()
    var mail = mails.find(function (mail) {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

// function composeMail() {
//     console.log('composeMail was activated')

// }


// // gets the params as an object from Compose:
// // and only adds the id, and time stamp and saves to the mails array

function createMail({ id, to, subject, body, isDraft, sentAt, isStarred }) {
    // console.log('createMail 11111')
    const mailToSave = {
        id: (id ? id : utilService.makeId()),
        // id: utilService.makeId(),
        from: loggedinUser.email,
        to,
        subject,
        body,
        isDraft,
        sentAt: (!sentAt ? Date.now() : sentAt),
        isStarred
    }
    // console.log('mailToSave: ', mailToSave)
    mails.push(mailToSave)
    console.log('mails: ', mails)
}

// function createMail(){
//     console.log('yoooo')
// }

function getNumOfUnReadMails(mails) {
    let counter = 0
    mails.forEach(mail => {
        if (!mail.isRead) counter++
    })
    return counter
}




// // function _saveMailsToStorage(mails) {
// //     storageService.saveToStorage(KEY, mails)
// // }

// // function _loadMailsFromStorage() {
// //     return storageService.loadFromStorage(KEY)
// // }


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}