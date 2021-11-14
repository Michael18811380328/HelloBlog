# Highlight text using ReactJS

https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs

I'm trying to highlight text matching the query but I can't figure out how to get the tags to display as HTML instead of text.

```js
var Component = React.createClass({
  _highlightQuery: function(name, query) {
    var regex = new RegExp("(" + query + ")", "gi");
    return name.replace(regex, "<strong>$1</strong>");
  },
  render: function() {
    var name = "Javascript";
    var query = "java"
    return (
      <div>
        <input type="checkbox" /> {this._highlightQuery(name, query)}
      </div>
    );
  }
});
```

### Answer

Here is my simple twoliner helper method:

```js
getHighlightedText(text, highlight) {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
}
```

It returns a span, where the requested parts are highlighted with `<b> </b>` tags. This can be simply modified to use another tag if needed.

**UPDATE:** To avoid unique key missing warning, here is a solution based on spans and setting fontWeight style for matching parts:

```js
getHighlightedText(text, highlight) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>;
}
```

