// import { eventBusService } from '../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { Compose } from '../cmps/Compose.jsx'
import { EditMail } from '../cmps/EditMail.jsx'
const { NavLink, Route } = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: 'inbox',
        isMailShown: false,
        refreshState: true,
        isComposing: false,
        isUpdating: false,
        isReading: false
    }

    componentDidMount() {
        this.loadMails()
    }

    // get ctgSearchParam() {
    //     const urlSearchParams = new URLSearchParams(this.props.location.search)
    //     return urlSearchParams.get('ctg')
    // }

    get mailsToDisplay() {
        const { mails } = this.state
        // const ctg = this.ctgSearchParam
        // return mails.filter(mail => !ctg || mail.ctg === ctg)
        return mails
    }

    
    loadMails = () => {
        // console.log(' i am in loadmails')

        mailService.query(this.state.filterBy).then(mails => {
            // eventBusService.emit('mails-count', mails.length)
            this.setState({ mails })
        })
    }

   
    onSetFilter = (ev) => {
        const filterBy = ev.target.getAttribute('data-filter-by')
        console.log('onSetFilter is activated')
        console.log('filterBy', filterBy)
        this.setState({ filterBy }, this.loadMails)

    }
    onOpenMail = () => { this.setState({ isMailShown: true }) }
    onRemoveMail = () => { this.loadMails() }
    toggleComposeBox = () => { this.setState({ isMailShown: !this.state.isMailShown }) }
    onAddMail = () => {
        this.loadMails()
        this.toggleComposeBox()
    }

    render() {
        const { mails } = this.state

        if (!mails) return <Loader />
        return (
            <section className="mail-app">
                {/* <EditMail/> */}
                <Compose isUpdating={this.state.isUpdating} isMailShown={this.state.isMailShown} onAddMail={this.onAddMail} />
                <div className="side-nav">
                    <button onClick={this.toggleComposeBox}>Compose</button>
                    <button data-filter-by='inbox' onClick={this.onSetFilter}>Inbox</button>
                    <button data-filter-by='sent' onClick={this.onSetFilter}>Sent</button>
                    <button data-filter-by='starred' onClick={this.onSetFilter}>Starred</button>
                    <button data-filter-by='draft' onClick={this.onSetFilter}>Draft</button>
                </div>
                {/* <Link className="primary-btn clean-link" to="/mail/edit">Add mail</Link> */}
                <MailList mails={this.mailsToDisplay} onRemoveMail={this.onRemoveMail} onOpenMail={this.onOpenMail} />
            </section>
        )
    }
}

