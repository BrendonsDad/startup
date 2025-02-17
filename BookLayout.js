import { useState } from "react"
import { Link, Outlet, useSearchParams} from "react-router-dom"

export function BookLayout() {
    const [searchParams, setSearchParams] = useSearchParams({n: 3})
    const number = searchParams.get("n")
    return (
        <>
            {/* These will all be rendered for each page */}
            <Link to="/book/1">Book 1</Link>
            <br />
            <Link to="/book/2">Book 2</Link>
            <br />
            <Link to={`/book/${number}`}>Book {number}</Link>
            <br />
            <Link to="/books/new">New Book</Link>
            {/* This allows all the sup content to be shown.*/}
            <Outlet context={{hello: "world"}}/>
            <input 
                type="number" 
                value={number}
                onChange={e => setSearchParams({ n: e.target.value })}
            />
        </>
    );
}