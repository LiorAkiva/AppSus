
// still in testing and using what is useful and deleting what's not

import { utilService } from '../services/util.service.js';
// import { mailService } from '../services/mail.service.js';
import { LongTxt } from '../cmps/LongTxt.jsx';
import { Loader } from './Loader.jsx';
// import { ReviewAdd } from '../cmps/ReviewAdd.jsx';
// import { ReviewList } from '../cmps/ReviewList.jsx';
import { mailService } from '../services/mail.service.js'

// shows the content of a mail from the main page and darkens background
export class ShowMail extends React.Component {
    state = {
        mail: null,
        // isLongTxtShown: false,
        isMailShown: false, //used for hiding the mail modal
    }

    componentDidMount() {
        this.loadMail();
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getMailById(mailId).then((mail) => {
            if (!mail) return this.props.history.push('/')
            this.setState({ mail })
        })
    }

    // onToggleTxt = () => {
    //     this.setState((prevState) => ({ ...prevState, isLongTxtShown: !this.state.isLongTxtShown }));
    // };

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    onRemoveMail = () => {
        const { id } = this.state.mail;
        mailService.removeMail(id).then(this.onGoBack)
    }
    
    // onRemoveReview = (reviewId) => {
    //     const bookId = this.state.book.id;
    //     bookService.removeReview(bookId, reviewId).then(this.loadBook);
    // };

    // onToggleReviewModal = () => {
    //     this.setState((prevState) => ({ ...prevState, isShowReviewModal: !this.state.isShowReviewModal }));
    // };

    // showStars = (countStar) => {
    //     return (
    //         [...Array(5)].map((star, idx) => (
    //             <span key={idx} className={"star " + (idx < countStar ? "on" : "off")}>&#9733;</span>
    //         ))
    //     )
    // }

    render() {
        if (!this.state.mail) return <Loader />

        // const { isLongTxtShown, isShowReviewModal } = this.state;
     
        const { from, to, subject, body, isRead, isDraft, sentAt, isStarred} = this.state.mail
        
        return (
            <section>
                <div className="mail-details">

                    <div className="details-container">
                        <h2>{subject}</h2>
                        <h3>sent at: {mail.sentAt}</h3>
                        <h3>From:{from}</h3>
                        <h3>To: {to}</h3>
                        <p>{body}</p>
                        <hr />
                        <h3>is read: {isRead}</h3>
                        <h3>is draft:{isDraft}</h3>
                        <h3>is starred: {isStarred ? '&#9733;' : ''}</h3>
                        <button onClick={this.onGoBack}>Go back</button>
                        <button onClick={this.onRemoveMail}>Delete</button> 
                        <hr />

                       {/* <LongTxt
                            key={id}
                            text={description}
                            isLongTxtShown={isLongTxtShown}
                            onToggleTxt={this.onToggleTxt}
                        /> 
                       <button onClick={this.onToggleReviewModal}>Add review</button>
                        {isShowReviewModal && (
                            <ReviewAdd bookId={id} loadBook={this.loadBook} onToggleReviewModal={this.onToggleReviewModal} />
                        )} */}
                    </div>
                </div>
            </section>
        )
    }
}
