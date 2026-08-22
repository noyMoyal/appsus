const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { BookDetails } from './apps/book/cmps/BookDetails.jsx'
import { BookAdd } from './apps/book/cmps/BookAdd.jsx'
import { BookDashboard } from './apps/book/pages/BookDashboard.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />

                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/add" element={<BookAdd />} />
                <Route path="/book/dashboard" element={<BookDashboard />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}