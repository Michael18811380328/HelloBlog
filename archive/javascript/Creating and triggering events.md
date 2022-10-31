# Creating and triggering events

[ Edit in wiki](https://wiki.developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)

This article demonstrates how to create and dispatch DOM events. Such events are commonly called **synthetic events**, as opposed to the events fired by the browser itself.

## Creating custom events

Events can be created with the [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) constructor as follows:

```js
const event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function (e) { /* ... */ }, false);

// Dispatch the event.
elem.dispatchEvent(event);
```

The above code example uses the [EventTarget.dispatchEvent()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) method.

This constructor is supported in most modern browsers (with Internet Explorer being the exception). For a more verbose approach (which works with Internet Explorer), see [the old-fashioned way](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way) below.

### Adding custom data – CustomEvent()

To add more data to the event object, the [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) interface exists and the **detail** property can be used to pass custom data.
For example, the event could be created as follows:

```js
const event = new CustomEvent('build', { detail: elem.dataset.time });
```

This will then allow you to access the additional data in the event listener:

```js
function eventHandler(e) {
  console.log('The time is: ' + e.detail);
}
```

### The old-fashioned way

The older approach to creating events uses APIs inspired by Java. The following shows an example with [`document.createEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent):

```js
// Create the event.
const event = document.createEvent('Event');

// Define that the event name is 'build'.
event.initEvent('build', true, true);

// Listen for the event.
elem.addEventListener('build', function (e) {
  // e.target matches elem
}, false);

// target can be any Element or other EventTarget.
elem.dispatchEvent(event);
```

### Event bubbling

It is often desirable to trigger an event from a child element, and have an ancestor catch it; optionally, with data:

```html
<form>
  <textarea></textarea>
</form>
const form = document.querySelector('form');
const textarea = document.querySelector('textarea');

// Create a new event, allow bubbling, and provide any data you want to pass to the "detail" property
const eventAwesome = new CustomEvent('awesome', {
  bubbles: true,
  detail: { text: () => textarea.value }
});

// The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
form.addEventListener('awesome', e => console.log(e.detail.text()));

// As the user types, the textarea inside the form dispatches/triggers the event to fire, and uses itself as the starting point
textarea.addEventListener('input', e => e.target.dispatchEvent(eventAwesome));
```

### Creating and dispatching events dynamically

Elements can listen for events that haven't been created yet:

```html
<form>
  <textarea></textarea>
</form>
const form = document.querySelector('form');
const textarea = document.querySelector('textarea');

form.addEventListener('awesome', e => console.log(e.detail.text()));

textarea.addEventListener('input', function() {
  // Create and dispatch/trigger an event on the fly
  // Note: Optionally, we've also leveraged the "function expression" (instead of the "arrow function expression") so "this" will represent the element
  this.dispatchEvent(new CustomEvent('awesome', { bubbles: true, detail: { text: () => textarea.value } }))
});
```

## Triggering built-in events

This example demonstrates simulating a click (that is programmatically generating a click event) on a checkbox using DOM methods. [View the example in action.](http://developer.mozilla.org/samples/domref/dispatchEvent.html)

```js
function simulateClick() {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  const cb = document.getElementById('checkbox'); 
  const cancelled = !cb.dispatchEvent(event);

  if (cancelled) {
    // A handler called preventDefault.
    alert("cancelled");
  } else {
    // None of the handlers called preventDefault.
    alert("not cancelled");
  }
}
```

## See also

- [CustomEvent()](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
- [`document.createEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent)
- [`Event.initEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent)
- [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)
- [`EventTarget.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

#### Metadata

- **Last modified:** Jun 30, 2020, [by MDN contributors](https://wiki.developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events$history)