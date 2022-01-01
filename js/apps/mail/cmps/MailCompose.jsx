
// import { mailService} from "../services/mail.service.js"
// import { eventBusService } from "../services/event-bus.service.js";


export class MailCompose extends React.Component {

    state = {
        mail: {
            isShown: true,
            // vendor: '',
            // speed: '',
        }
    }

    // inputRef = React.createRef()

    // componentDidMount() {
    //     // this.inputRef.current.focus()
    //     this.loadMail()
    // }

    // loadMail = () => {
    //     const { mailId } = this.props.match.params
    //     // composing a new mail
    //     if (!mailId) return
    //     console.log('mailId in mail Edit', mailId);
    //     carService.getCarById(carId).then(car => {
    //         if (!car) return this.props.history.push('/')
    //         this.setState({ car })
    //     })
    // }

    // handleChange = ({ target }) => {
    //     const field = target.name
    //     const value = target.type === 'number' ? +target.value : target.value
    //     this.setState((prevState) => ({ car: { ...prevState.car, [field]: value } }))
    // }

    // onGoBack = () => {
    //     this.props.history.push('/car')
    // }

    // onSaveCar = (ev) => {
    //     ev.preventDefault()
    //     const { car } = this.state
    //     carService.saveCar(car).then(() => {
    //         eventBusService.emit('user-msg', { txt: 'Saved !', type: 'success' })
    //         this.onGoBack()
    //     })
    // }
    // isShown = this.state.mail.isShown
    render() {
        return (
            
            <section className="mail-edit"  >
                {/* <h1>{id ? 'Edit' : 'Add'} car</h1>
                <form onSubmit={this.onSaveCar} >
                    <label htmlFor="by-vendor">Vendor:</label>
                    <input ref={this.inputRef} placeholder="Enter vendor" name="vendor" type="text" id="by-vendor" value={vendor} onChange={this.handleChange} />
                    <label htmlFor="by-speed">Speed:</label>
                    <input placeholder="Enter speed" name="speed" type="number" id="by-speed" value={speed} onChange={this.handleChange} />
                    <button className="primary-btn ">Save car</button>
                </form> */}


                <h1>compose new mail (hidden)</h1>
            </section>
        )
    }

}