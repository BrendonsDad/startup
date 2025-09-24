# HTML input elements
See this for a list of uses:
https://github.com/webprogramming260/.github/blob/main/profile/html/input/input.md

## Form element
- Main purpose of the form element is to submit the values of the inputs it contains
- Before JavaScript was introduced, the form container element was seesntial because it was the only way for the browser to send the input data to a web server as part of a request to process the input and generate a new web page displaying the result of the input. 
- With Javascript data may not even be sent to the server, and can still dynamically change the page based on input. 
- Now, the form element is used simply as a container. 
- You are not required to have a form element to use input elements. 

example of a simple form 

```html
<form action="submission.html" method="post">
    <label for="ta">TextArea: </label>
    <textarea id="ta" name="ta-id">
        Some Text
    </textarea>
    <button type="submit">Submit</button>
</form>
```

## Input element
You set the type of input with the type attribute. You can see the types like password, email, tel, etc. on the link above. 

