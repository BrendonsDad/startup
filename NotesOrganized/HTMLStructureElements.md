# HTML Structure Elements
- The two major puposes of HTML is to provide structure and content to your web application. 
- It starts with the top level content body. The body has three children, a header, main, and footer. Each of the body children then contains other structural content. 

The header contains a p aragraph with a span., and a nav igation containing multiple div isions of sub-content.

The main contains multiple section s that contain either an undorderd list (ul) or a table. Main also contains an aside for content that does not fit the content flow of the sections.

The footer has a content division with a single span. 


```html

<body>
    <p>Body</p>
    <header>
        <p>Header - <span>Span></span></p>
        <nav>
            Navigation
            <div>Div</div>
            <div>Div</div>
        </nav>
    </header>

    <main>
        <section>
            <p>Section</p>
            <ul>
                <li>List</li>
                <li>List</li>
                <li>List</li>
            </ul>
        </section>
        <section>
            <p>Section</p>
            <table>
                <tr>
                    <th>Table</th>
                    <th>Table</th>
                    <th>Table</th>
                </tr>
                <tr>
                    <th>table</th>
                    <th>table</th>
                    <th>table</th>
                </tr>
            </table>
        </section>
        <aside>
            <p>Aside</p>
        </aside>
    </main>

    <footer>
        <div>Footer - <span>Span</span></div>
    </footer>
</body>

```

## Block and inline
* A block element is meant to be a distinct block in the flow of the content structure. 
* An inline element is meant to be inline with the content flow of a block element. 