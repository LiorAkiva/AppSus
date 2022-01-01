
// const { Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
const iconOpenEnvelope = "../../../../assets/apps/mail/icons/envelope-open-solid.svg"
const iconClosedEnvelope = "../../../../assets/apps/mail/icons/envelope-solid.svg"
const iconEnvelopeOpenToRead = "../../../../assets/apps/mail/icons/envelope-open-to-read.svg"
const iconEmptyStar = "../../../../assets/apps/mail/icons/star-regular.svg"
const iconFilledStar = "../../../../assets/apps/mail/icons/star-solid.svg"
const iconTrash = "../../../../assets/apps/mail/icons/trash-solid.svg"
const iconReply = "../../../../assets/apps/mail/icons/reply-solid.svg"
const iconEdit = "../../../../assets/apps/mail/icons/edit-solid.svg"



export function MailPreview(props) {
    const { mail, onRemoveMail, onOpenMail } = props
  
    const { mailId, sentAt } = mail

    // here will be the READ of CRUD
    const openMail = (ev) => {
        console.log('a mail should be opened to read')
        const mailId = (ev.target.getAttribute('data-id'))
        props.onOpenMail()
    }
    //here will be the Update of CRUD...
    const toggleStarred = (ev) => {
        const mailId = (ev.target.getAttribute('data-id'))
        mailService.toggleStar(mailId).then(() => { props.onRemoveMail() }) // is it necessary? it works for sure
    }
    //here ISthe Delete of CRUD...
    const deleteMail = (ev) => {
        const mailId = (ev.target.getAttribute('data-id'))
        mailService.removeMail(mailId).then(() => { props.onRemoveMail() }) // is it necessary? it works for sure
    }

    // the long version:
    // console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(sentAt))
    const hours = new Intl.DateTimeFormat('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }).format(sentAt)
    const day = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' }).format(sentAt)
    const diff = (Date.now() - sentAt) / 86400000

    return (
        <article className="mail-preview" >

            <img className="icon" src={(mail.isDraft) ? iconEdit : (mail.isRead ? iconOpenEnvelope : iconClosedEnvelope)} onClick={(mail.isDraft)? 1  :  1} alt="" />
            <h2><span>{(mail.from === 'user@appsus.com') ? '' : mail.from}</span></h2>
            <h2><span>{(mail.to === 'user@appsus.com') ? '' : mail.to}</span></h2>
            <h2 className="mail-subject">{mail.subject}</h2>
            <div className="mail-body" >
                <p>{mail.body}</p>
            </div>
            <div className="mail-previev-btns">
                <img data-id={mail.id} className="icon" onClick={openMail} src={iconEnvelopeOpenToRead} alt="" />
                <img data-id={mail.id} onClick={deleteMail} className="icon" src={iconTrash} alt="" />
                <img data-id={mail.id} className="icon" onClick={toggleStarred} src={(mail.isStarred) ? iconFilledStar : iconEmptyStar} alt="" />

                <h3>{(diff > 1) ? day : hours}</h3>

            </div>


        </article>
        // </Link>
    )
}