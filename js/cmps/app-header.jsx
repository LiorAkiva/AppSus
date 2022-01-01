// import { eventBusService } from '../services/event-bus.service.js';

const {NavLink, withRouter} = ReactRouterDOM;

class _AppHeader extends React.Component {
    render(){
    return (
        <div className="header-container flex space-between align-center">
            <div className="logo flex align-center">
                <h1 onClick={() => this.props.history.push('/')}>AppSus</h1>
            </div>
            <nav className="app-nav flex justify-center">
                <NavLink className="nav-btn" to="/mail">Email</NavLink>
                <NavLink className="nav-btn" to="/keep">Notes</NavLink>
                <NavLink className="nav-btn" to="/book">Books</NavLink>
            </nav>
        </div>
    
    );
    }
}

export const AppHeader = withRouter(_AppHeader);