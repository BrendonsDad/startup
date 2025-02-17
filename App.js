import { Route, Routes } from "react-router-dom"
import { NotFound } from "./pages/NotFound"
import { BookRoutes } from "./BookRoutes"

function App() {
    const location = useLocation();
    return (
    <>
    <Routes location="/books">
        {/* you can take the path off if you don't want the path nested but you want
        them to each have the same content (think header and footer, and navbar) */}
        <Route path="/books" element={<h1>Extra Content</h1>} />

    </Routes>
    <nav>
        <ul>
            <li><Link to="/" state="Hi">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
        </ul>
    </nav>
    {location.state}
    <Routes>
        <Route path="/" element={<Home />} />
        {/* you can take the path off if you don't want the path nested but you want
        them to each have the same content (think header and footer, and navbar) */}
        <Route path="/books/*" element={<BookRoutes />} />
        {/* <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/new" element={<NewBook />} /> */}
        <Route path="*" element={<NotFound />} />
    </Routes>
    </>
    )
}

export default App