import { mailService } from '../services/mail.service.js'
// import { eventBusService } from '../services/event-bus.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { MailList } from '../cmps/MailList.jsx'
// import { MailFilter } from '../cmps/MailFilter.jsx'
// import { Compose } from '../cmps/Compose.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { func } from 'prop-types'

const { NavLink, Route } = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: null,

    }

    componentDidMount() {
        this.loadMails()
    }

    get ctgSearchParam() {
        const urlSearchParams = new URLSearchParams(this.props.location.search)
        return urlSearchParams.get('ctg')
    }

    get mailsToDisplay() {
        const { mails } = this.state
        // const ctg = this.ctgSearchParam
        // return mails.filter(mail => !ctg || mail.ctg === ctg)
        return mails
    }


    // loadMails = () => {
    //     const { filterBy } = this.state
    //     mailService.query(filterBy).then(mails => {
    //         eventBusService.emit('mails-count', mails.length)
    //         this.setState({ mails })
    //     })
    // }
    loadMails = () => {
        mailService.query().then(mails => {
            // eventBusService.emit('mails-count', mails.length)
            this.setState({ mails })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    // onCompose = () => {
    //     mailService.composeMail()
    // }
   

    render() {
        const { mails } = this.state

        if (!mails) return <Loader />
        return (
            <section className="mail-app">
                {/* <h1>Mail App:</h1><button onClick={this.onCompose}>Compose</button> */}
                <NavLink activeClassName="my-active" to="/mail/compose"><button>Compose</button></NavLink>
                <Route component={Compose} path="/mail/compose" />
                {/* <MailCompose /> */}
                {/* <MailFilter onSetFilter={this.onSetFilter} /> */}
                {/* <Link className="primary-btn clean-link" to="/mail/edit">Add mail</Link> */}
                {/* <Compose /> */}
                <MailList mails={this.mailsToDisplay} />
            </section>
        )
    }
}

function Compose() {
    return <section>
        <form>
            <label htmlFor="email">To: <input type="email" name="email" id="email" /></label>           
            <label htmlFor="subject">Subject: <input type="text" name="subject" id="subject" /></label>
            <textarea name="body" id="body" cols="30" rows="10"></textarea>
            <button onClick={goToMail()}>send</button>
            <h3>link to notes</h3>
        </form>
    </section>

}

function goToMail(){
    
}