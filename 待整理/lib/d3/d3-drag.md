# d3-drag

[Drag-and-drop](https://en.wikipedia.org/wiki/Drag_and_drop) is a popular and easy-to-learn pointing gesture: move the pointer to an object, press and hold to grab it, “drag” the object to a new location, and release to “drop”. D3’s [drag behavior](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#api-reference) provides a convenient but flexible abstraction for enabling drag-and-drop interaction on [selections](https://github.com/d3/d3-selection). For example, you can use d3-drag to facilitate interaction with a [force-directed graph](https://github.com/d3/d3-force), or a simulation of colliding circles:

[![Force Dragging III](https://raw.githubusercontent.com/d3/d3-drag/master/img/force-graph.png)](http://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048)[![Force Dragging II](https://raw.githubusercontent.com/d3/d3-drag/master/img/force-collide.png)](http://bl.ocks.org/mbostock/2990a882e007f8384b04827617752738)

You can also use d3-drag to implement custom user interface elements, such as a slider. But the drag behavior isn’t just for moving elements around; there are a variety of ways to respond to a drag gesture. For example, you can use it to lasso elements in a scatterplot, or to paint lines on a canvas:

[![Line Drawing](https://raw.githubusercontent.com/d3/d3-drag/master/img/drawing.png)](http://bl.ocks.org/mbostock/f705fc55e6f26df29354)

The drag behavior can be combined with other behaviors, such as [d3-zoom](https://github.com/d3/d3-zoom) for zooming.

[![Drag & Zoom II](https://raw.githubusercontent.com/d3/d3-drag/master/img/dots.png)](http://bl.ocks.org/mbostock/3127661b6f13f9316be745e77fdfb084)

The drag behavior is agnostic about the DOM, so you can use it with SVG, HTML or even Canvas! And you can extend it with advanced selection techniques, such as a Voronoi overlay or a closest-target search:

[![Circle Dragging IV](https://raw.githubusercontent.com/d3/d3-drag/master/img/voronoi.png)](http://bl.ocks.org/mbostock/ec10387f24c1fad2acac3bc11eb218a5)[![Circle Dragging II](https://raw.githubusercontent.com/d3/d3-drag/master/img/canvas.png)](http://bl.ocks.org/mbostock/c206c20294258c18832ff80d8fd395c3)

Best of all, the drag behavior automatically unifies mouse and touch input, and avoids browser idiosyncrasies. When [Pointer Events](https://www.w3.org/TR/pointerevents/) are more widely available, the drag behavior will support those, too.

## Installing

If you use NPM, `npm install d3-drag`. Otherwise, download the [latest release](https://github.com/d3/d3-drag/releases/latest). You can also load directly from [d3js.org](https://d3js.org/), either as a [standalone library](https://d3js.org/d3-drag.v1.min.js) or as part of [D3 4.0](https://github.com/d3/d3). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```
<script src="https://d3js.org/d3-dispatch.v1.min.js"></script>
<script src="https://d3js.org/d3-selection.v1.min.js"></script>
<script src="https://d3js.org/d3-drag.v1.min.js"></script>
<script>

var drag = d3.drag();

</script>
```

[Try d3-drag in your browser.](https://tonicdev.com/npm/d3-drag)

## API Reference

This table describes how the drag behavior interprets native events:

| Event        | Listening Element | Drag Event | Default Prevented? |
| ------------ | ----------------- | ---------- | ------------------ |
| mousedown⁵   | selection         | start      | no¹                |
| mousemove²   | window¹           | drag       | yes                |
| mouseup²     | window¹           | end        | yes                |
| dragstart²   | window            | -          | yes                |
| selectstart² | window            | -          | yes                |
| click³       | window            | -          | yes                |
| touchstart   | selection         | start      | no⁴                |
| touchmove    | selection         | drag       | yes                |
| touchend     | selection         | end        | no⁴                |
| touchcancel  | selection         | end        | no⁴                |

The propagation of all consumed events is [immediately stopped](https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation). If you want to prevent some events from initiating a drag gesture, use [*drag*.filter](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_filter).

¹ Necessary to capture events outside an iframe; see [#9](https://github.com/d3/d3-drag/issues/9).
² Only applies during an active, mouse-based gesture; see [#9](https://github.com/d3/d3-drag/issues/9).
³ Only applies immediately after some mouse-based gestures; see [*drag*.clickDistance](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_clickDistance).
⁴ Necessary to allow [click emulation](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7) on touch input; see [#9](https://github.com/d3/d3-drag/issues/9).
⁵ Ignored if within 500ms of a touch gesture ending; assumes [click emulation](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7).

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag) d3.**drag**() [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js)

Creates a new drag behavior. The returned behavior, [*drag*](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#_drag), is both an object and a function, and is typically applied to selected elements via [*selection*.call](https://github.com/d3/d3-selection#selection_call).

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#_drag) *drag*(*selection*) [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js#L39)

Applies this drag behavior to the specified [*selection*](https://github.com/d3/d3-selection). This function is typically not invoked directly, and is instead invoked via [*selection*.call](https://github.com/d3/d3-selection#selection_call). For example, to instantiate a drag behavior and apply it to a selection:

```
d3.selectAll(".node").call(d3.drag().on("start", started));
```

Internally, the drag behavior uses [*selection*.on](https://github.com/d3/d3-selection#selection_on) to bind the necessary event listeners for dragging. The listeners use the name `.drag`, so you can subsequently unbind the drag behavior as follows:

```
selection.on(".drag", null);
```

Applying the drag behavior also sets the [-webkit-tap-highlight-color](https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html#//apple_ref/doc/uid/TP40006510-SW5) style to transparent, disabling the tap highlight on iOS. If you want a different tap highlight color, remove or re-apply this style after applying the drag behavior.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_container) *drag*.**container**([*container*]) [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js#L145)

If *container* is specified, sets the container accessor to the specified object or function and returns the drag behavior. If *container* is not specified, returns the current container accessor, which defaults to:

```
function container() {
  return this.parentNode;
}
```

The *container* of a drag gesture determines the coordinate system of subsequent [drag events](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag-events), affecting *event*.x and *event*.y. The element returned by the container accessor is subsequently passed to [d3.mouse](https://github.com/d3/d3-selection#mouse) or [d3.touch](https://github.com/d3/d3-selection#touch), as appropriate, to determine the local coordinates of the pointer.

The default container accessor returns the parent node of the element in the originating selection (see [*drag*](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#_drag)) that received the initiating input event. This is often appropriate when dragging SVG or HTML elements, since those elements are typically positioned relative to a parent. For dragging graphical elements with a Canvas, however, you may want to redefine the container as the initiating element itself:

```
function container() {
  return this;
}
```

Alternatively, the container may be specified as the element directly, such as `drag.container(canvas)`.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_filter) *drag*.**filter**([*filter*]) [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js#L141)

If *filter* is specified, sets the filter to the specified function and returns the drag behavior. If *filter* is not specified, returns the current filter, which defaults to:

```
function filter() {
  return !d3.event.ctrlKey && !d3.event.button;
}
```

If the filter returns falsey, the initiating event is ignored and no drag gestures are started. Thus, the filter determines which input events are ignored; the default filter ignores mousedown events on secondary buttons, since those buttons are typically intended for other purposes, such as the context menu.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_touchable) *drag*.**touchable**([*touchable*]) [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js#L153)

If *touchable* is specified, sets the touch support detector to the specified function and returns the drag behavior. If *touchable* is not specified, returns the current touch support detector, which defaults to:

```
function touchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}
```

Touch event listeners are only registered if the detector returns truthy for the corresponding element when the drag behavior is [applied](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#_drag). The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example, fails detection.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_subject) *drag*.**subject**([*subject*]) [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js#L149)

If *subject* is specified, sets the subject accessor to the specified object or function and returns the drag behavior. If *subject* is not specified, returns the current subject accessor, which defaults to:

```
function subject(d) {
  return d == null ? {x: d3.event.x, y: d3.event.y} : d;
}
```

The *subject* of a drag gesture represents *the thing being dragged*. It is computed when an initiating input event is received, such as a mousedown or touchstart, immediately before the drag gesture starts. The subject is then exposed as *event*.subject on subsequent [drag events](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag-events) for this gesture.

The default subject is the [datum](https://github.com/d3/d3-selection#selection_datum) of the element in the originating selection (see [*drag*](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#_drag)) that received the initiating input event; if this datum is undefined, an object representing the coordinates of the pointer is created. When dragging circle elements in SVG, the default subject is thus the datum of the circle being dragged. With [Canvas](https://html.spec.whatwg.org/multipage/scripting.html#the-canvas-element), the default subject is the canvas element’s datum (regardless of where on the canvas you click). In this case, a custom subject accessor would be more appropriate, such as one that picks the closest circle to the mouse within a given search *radius*:

```
function subject() {
  var n = circles.length,
      i,
      dx,
      dy,
      d2,
      s2 = radius * radius,
      circle,
      subject;

  for (i = 0; i < n; ++i) {
    circle = circles[i];
    dx = d3.event.x - circle.x;
    dy = d3.event.y - circle.y;
    d2 = dx * dx + dy * dy;
    if (d2 < s2) subject = circle, s2 = d2;
  }

  return subject;
}
```

(If necessary, the above can be accelerated using [*quadtree*.find](https://github.com/d3/d3-quadtree#quadtree_find).)

The returned subject should be an object that exposes `x` and `y` properties, so that the relative position of the subject and the pointer can be preserved during the drag gesture. If the subject is null or undefined, no drag gesture is started for this pointer; however, other starting touches may yet start drag gestures. See also [*drag*.filter](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_filter).

The subject of a drag gesture may not be changed after the gesture starts. The subject accessor is invoked with the same context and arguments as [*selection*.on](https://github.com/d3/d3-selection#selection_on) listeners: the current datum `d` and index `i`, with the `this` context as the current DOM element. During the evaluation of the subject accessor, [d3.event](https://github.com/d3/d3-selection#event) is a beforestart [drag event](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag-events). Use *event*.sourceEvent to access the initiating input event and *event*.identifier to access the touch identifier. The *event*.x and *event*.y are relative to the [container](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_container), and are computed using [d3.mouse](https://github.com/d3/d3-selection#mouse) or [d3.touch](https://github.com/d3/d3-selection#touch) as appropriate.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_clickDistance) *drag*.**clickDistance**([*distance*]) [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js#L162)

If *distance* is specified, sets the maximum distance that the mouse can move between mousedown and mouseup that will trigger a subsequent click event. If at any point between mousedown and mouseup the mouse is greater than or equal to *distance* from its position on mousedown, the click event following mouseup will be suppressed. If *distance* is not specified, returns the current distance threshold, which defaults to zero. The distance threshold is measured in client coordinates ([*event*.clientX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX) and [*event*.clientY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)).

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_on) *drag*.**on**(*typenames*, [*listener*]) [<>](https://github.com/d3/d3-drag/blob/master/src/drag.js#L157)

If *listener* is specified, sets the event *listener* for the specified *typenames* and returns the drag behavior. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If *listener* is null, removes the current event listeners for the specified *typenames*, if any. If *listener* is not specified, returns the first currently-assigned listener matching the specified *typenames*, if any. When a specified event is dispatched, each *listener* will be invoked with the same context and arguments as [*selection*.on](https://github.com/d3/d3-selection#selection_on) listeners: the current datum `d` and index `i`, with the `this` context as the current DOM element.

The *typenames* is a string containing one or more *typename* separated by whitespace. Each *typename* is a *type*, optionally followed by a period (`.`) and a *name*, such as `drag.foo` and `drag.bar`; the name allows multiple listeners to be registered for the same *type*. The *type* must be one of the following:

- `start` - after a new pointer becomes active (on mousedown or touchstart).
- `drag` - after an active pointer moves (on mousemove or touchmove).
- `end` - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).

See [*dispatch*.on](https://github.com/d3/d3-dispatch#dispatch_on) for more.

Changes to registered listeners via *drag*.on during a drag gesture *do not affect* the current drag gesture. Instead, you must use [*event*.on](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#event_on), which also allows you to register temporary event listeners for the current drag gesture. **Separate events are dispatched for each active pointer** during a drag gesture. For example, if simultaneously dragging multiple subjects with multiple fingers, a start event is dispatched for each finger, even if both fingers start touching simultaneously. See [Drag Events](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag-events) for more.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#dragDisable) d3.**dragDisable**(*window*) [<>](https://github.com/d3/d3-drag/blob/master/src/nodrag.js#L4)

Prevents native drag-and-drop and text selection on the specified *window*. As an alternative to preventing the default action of mousedown events (see [#9](https://github.com/d3/d3-drag/issues/9)), this method prevents undesirable default actions following mousedown. In supported browsers, this means capturing dragstart and selectstart events, preventing the associated default actions, and immediately stopping their propagation. In browsers that do not support selection events, the user-select CSS property is set to none on the document element. This method is intended to be called on mousedown, followed by [d3.dragEnable](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#dragEnable) on mouseup.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#dragEnable) d3.**dragEnable**(*window*[, *noclick*]) [<>](https://github.com/d3/d3-drag/blob/master/src/nodrag.js#L15)

Allows native drag-and-drop and text selection on the specified *window*; undoes the effect of [d3.dragDisable](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#dragDisable). This method is intended to be called on mouseup, preceded by [d3.dragDisable](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#dragDisable) on mousedown. If *noclick* is true, this method also temporarily suppresses click events. The suppression of click events expires after a zero-millisecond timeout, such that it only suppress the click event that would immediately follow the current mouseup event, if any.

### Drag Events

When a [drag event listener](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_on) is invoked, [d3.event](https://github.com/d3/d3-selection#event) is set to the current drag event. The *event* object exposes several fields:

- `target` - the associated [drag behavior](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag).
- `type` - the string “start”, “drag” or “end”; see [*drag*.on](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_on).
- `subject` - the drag subject, defined by [*drag*.subject](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_subject).
- `x` - the new *x*-coordinate of the subject; see [*drag*.container](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_container).
- `y` - the new *y*-coordinate of the subject; see [*drag*.container](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_container).
- `dx` - the change in *x*-coordinate since the previous drag event.
- `dy` - the change in *y*-coordinate since the previous drag event.
- `identifier` - the string “mouse”, or a numeric [touch identifier](https://www.w3.org/TR/touch-events/#widl-Touch-identifier).
- `active` - the number of currently active drag gestures (on start and end, not including this one).
- `sourceEvent` - the underlying input event, such as mousemove or touchmove.

The *event*.active field is useful for detecting the first start event and the last end event in a sequence of concurrent drag gestures: it is zero when the first drag gesture starts, and zero when the last drag gesture ends.

The *event* object also exposes the [*event*.on](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#event_on) method.

[#](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#event_on) *event*.**on**(*typenames*, [*listener*]) [<>](https://github.com/d3/d3-drag/blob/master/src/event.js)

Equivalent to [*drag*.on](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_on), but only applies to the current drag gesture. Before the drag gesture starts, a [copy](https://github.com/d3/d3-dispatch#dispatch_copy) of the current drag [event listeners](https://github.com/d3/d3-drag/blob/v1.2.5/README.md#drag_on) is made. This copy is bound to the current drag gesture and modified by *event*.on. This is useful for temporary listeners that only receive events for the current drag gesture. For example, this start event listener registers temporary drag and end event listeners as closures:

```
function started() {
  var circle = d3.select(this).classed("dragging", true);

  d3.event.on("drag", dragged).on("end", ended);

  function dragged(d) {
    circle.raise().attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  }

  function ended() {
    circle.classed("dragging", false);
  }
}
```