
import { AppHome } from './js/pages/app-home.jsx';
import { AppHeader } from './js/cmps/app-header.jsx';
import { NoteApp } from './js/apps/keep/pages/note-index.jsx';
// import { AppFooter } from './js/cmps/AppFooter.jsx';
import { MailApp } from './js/apps/mail/pages/MailApp.jsx'
// import { BookApp } from 'apps/book/pages/book-index.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App(){
    return(
    <Router>
        <header className="app-header">
            <AppHeader/>
        </header> <hr></hr>
        <main className="app-main">
            <Switch>
                <Route component={MailApp} path="/mail"/>
                <Route component={NoteApp} path="/keep"/>
                <Route component={AppHome} path="/"/>
                {/* <Route component={BookApp} path="/book"/> */}
            </Switch>
        </main>
        <footer>
            {/* <AppFooter/> */}
        </footer>
    </Router>
    );
}