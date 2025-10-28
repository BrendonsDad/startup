# JSON

JavaScript Object Notation(JSON) was conceived by Douglas Crockford in 2001 while working at Yahoo!

JSON provides a simple and yet effective way to share and store data. By design it is easily convertible to and from, JavaScript objects. 

here is an example of a JSON document

```json
{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}
```

### Converting to JavaScript
You can convert JSON to and from JavaScript using the JSON.parse and JSON.stringify functions

```js
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```