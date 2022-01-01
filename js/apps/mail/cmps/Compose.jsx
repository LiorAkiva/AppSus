import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export class Compose extends React.Component {
    state = {
        to: '',
        subject: '',
        body: '',
        isDraft: false,
        sentAt: null,
        isStarred: true,
        isComposing: false,
        isUpdating: false,
        isReading: false
    }
    componentDidMount(){
        console.log('compose was mounted')
    }
    sendMail = (ev) => {
        ev.preventDefault()
        console.log('sendMail 111')
        const mailToSave = {
            to: this.state.to,
            subject: this.state.subject,
            body: this.state.body,
            isDraft: false,
            sentAt: null,
            isStarred: false
        }
        mailService.createMail(mailToSave)
        this.props.onAddMail()
    }
    cancel = () => { this.props.onAddMail() }
    saveDraft = (ev) => {
        const mailToSave = {
            to: this.state.to,
            subject: this.state.subject,
            body: this.state.body,
            isDraft: true,
            sentAt: null,
            isStarred: false
        }
        mailService.createMail(mailToSave)
        this.props.onAddMail()
    }
    onSubmitForm = (ev) => {
        // console.log('ev (in onSubmitForm):', ev)
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    render() {
        let isMailShown = this.props.isMailShown ? "compose-mail-form" : "hidden"
        // console.log('is mail shown: ', isMailShown)

        return <form className={isMailShown} onSubmit={this.onSubmitForm}>
            <button>Notes - should be a link</button>
            <label htmlFor="email">To: <input type="email" name="to" id="email" value={this.state.to} onChange={this.handleChange} /></label>
            <hr />
            <label htmlFor="subject">Subject: <input type="text" name="subject" id="subject" value={this.state.subject} onChange={this.handleChange} /></label>
            <hr />
            <textarea id="body" cols="30" rows="10" name="body" value={this.state.body} onChange={this.handleChange}></textarea>
            <span> <button onClick={this.sendMail}>Send</button><button onClick={this.saveDraft}>Save as draft</button><button onClick={this.cancel}>Cancel</button></span>


        </form>
    }

}