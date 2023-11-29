# Leaflet



Leaflet is the leading open-source JavaScript library for **mobile-friendly interactive maps**. Weighing just about 39 KB of gzipped JS plus 4 KB of gzipped CSS code, it has all the mapping [features](http://leafletjs.com/#features) most developers ever need.

Leaflet is designed with *simplicity*, *performance* and *usability* in mind. It works efficiently across all major desktop and mobile platforms out of the box, taking advantage of HTML5 and CSS3 on modern browsers while being accessible on older ones too. It can be extended with a huge amount of [plugins](http://leafletjs.com/plugins.html), has a beautiful, easy to use and [well-documented](http://leafletjs.com/reference.html) API and a simple, readable [source code](https://github.com/Leaflet/Leaflet) that is a joy to [contribute](https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md) to.

For more info, docs and tutorials, check out the [official website](http://leafletjs.com/).
For **Leaflet downloads** (including the built master version), check out the [download page](http://leafletjs.com/download.html).

We're happy to meet new contributors. If you want to **get involved** with Leaflet development, check out the [contribution guide](https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md). Let's make the best mapping library that will ever exist, and push the limits of what's possible with online maps!

### an open-source JavaScript library for mobile-friendly interactive maps

- Overview


- [Tutorials](https://leafletjs.com/examples.html)


- [Docs](https://leafletjs.com/reference-1.6.0.html)


- [Download](https://leafletjs.com/download.html)


- [Plugins](https://leafletjs.com/plugins.html)


- [Blog](https://leafletjs.com/blog.html)

Nov 17, 2019 — [Leaflet 1.6.0](https://leafletjs.com/2019/11/17/leaflet-1.6.0.html) has been released!

Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. Weighing just about 38 KB of JS, it has all the mapping [features](https://leafletjs.com/#features) most developers ever need.

Leaflet is designed with *simplicity*, *performance* and *usability* in mind. It works efficiently across all major desktop and mobile platforms, can be extended with lots of [plugins](https://leafletjs.com/plugins.html), has a beautiful, easy to use and [well-documented API](https://leafletjs.com/reference.html) and a simple, readable [source code](https://github.com/Leaflet/Leaflet) that is a joy to [contribute](https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md) to.

![img](https://b.tile.openstreetmap.org/15/16369/10896.png)![img](https://a.tile.openstreetmap.org/15/16369/10895.png)![img](https://a.tile.openstreetmap.org/15/16368/10896.png)![img](https://c.tile.openstreetmap.org/15/16370/10896.png)![img](https://c.tile.openstreetmap.org/15/16369/10897.png)![img](https://c.tile.openstreetmap.org/15/16368/10895.png)![img](https://b.tile.openstreetmap.org/15/16370/10895.png)![img](https://b.tile.openstreetmap.org/15/16368/10897.png)![img](https://a.tile.openstreetmap.org/15/16370/10897.png)![img](https://c.tile.openstreetmap.org/15/16367/10896.png)![img](https://a.tile.openstreetmap.org/15/16371/10896.png)![img](https://b.tile.openstreetmap.org/15/16367/10895.png)![img](https://c.tile.openstreetmap.org/15/16371/10895.png)![img](https://a.tile.openstreetmap.org/15/16367/10897.png)![img](https://b.tile.openstreetmap.org/15/16371/10897.png)

![img](https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png)

![img](https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png)

A pretty CSS3 popup.
Easily customizable.

[×](https://leafletjs.com/#close)

[+](https://leafletjs.com/#)[−](https://leafletjs.com/#)

[Leaflet](https://leafletjs.com/) | © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors

Here we create a map in the `'map'` div, add tiles of our choice, and then add a marker with some text in a popup:

```
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
```

Learn more with the [quick start guide](https://leafletjs.com/examples/quick-start/), check out [other tutorials](https://leafletjs.com/examples.html), or head straight to the [API documentation](https://leafletjs.com/reference.html). If you have any questions, take a look at the [FAQ](https://github.com/Leaflet/Leaflet/blob/master/FAQ.md) first.

## Trusted by the best

[GitHub](https://github.com/) [foursquare](http://foursquare.com/) [Pinterest](https://www.pinterest.com/) [Facebook](https://www.facebook.com/) [Evernote](https://evernote.com/) [Etsy](https://www.etsy.com/) [Flickr](https://www.flickr.com/) [500px](https://500px.com/) [Data.gov](http://www.data.gov/) [European Commission](http://ec.europa.eu/) [The Washington Post](https://www.washingtonpost.com/) [Financial Times](http://www.ft.com/) [NPR](http://www.npr.org/) [USA Today](http://www.usatoday.com/) [National Park Service](http://www.nps.gov/) [IGN.com](http://ign.com/) [OpenStreetMap](https://www.openstreetmap.org/)

## Features

Leaflet doesn't try to do everything for everyone. Instead it focuses on making *the basic things work perfectly*.

### Layers Out of the Box

- Tile layers, WMS
- Markers, Popups
- Vector layers: polylines, polygons, circles, rectangles
- Image overlays
- GeoJSON

### Interaction Features

- Drag panning with inertia
- Scroll wheel zoom
- Pinch-zoom on mobile
- Double click zoom
- Zoom to area (shift-drag)
- Keyboard navigation
- Events: click, mouseover, etc.
- Marker dragging

### Visual Features

- Zoom and pan animation
- Tile and popup fade animation
- Very nice default design for markers, popups and map controls
- Retina resolution support

### Customization Features

- Pure CSS3 popups and controls for easy restyling
- Image- and HTML-based markers
- A simple interface for custom map layers and controls
- Custom map projections (with `EPSG:3857/4326/3395` out of the box)
- Powerful OOP facilities for extending existing classes

### Performance Features

- Hardware acceleration on mobilemakes it feel as smooth as native apps
- Utilizing CSS3 features to make panning and zooming really smooth
- Smart polyline/polygon rendering with dynamic clipping and simplification makes it very fast
- Modular build system for leaving out features you don't need
- Tap delay elimination on mobile

### Map Controls

- Zoom buttons
- Attribution
- Layer switcher
- Scale

### Browser Support

#### Desktop

- Chrome
- Firefox
- Safari 5+
- Opera 12+
- IE 7–11
- Edge

#### Mobile

- Safari for iOS 7+
- Android browser 2.2+, 3.1+, 4+
- Chrome for mobile
- Firefox for mobile
- IE10+ for Win8 devices

### Misc

- Extremely lightweight
- No external dependencies

If you find some feature really missing in Leaflet, first check if there's a [plugin for it](https://leafletjs.com/plugins.html) and if it's been discussed before already on [GitHub issues](https://github.com/Leaflet/Leaflet/issues). If not, please open a new GitHub issue.

## Getting Involved

Let's create the best mapping library in the world! Leaflet was originally created by [Vladimir Agafonkin](https://agafonkin.com/), but is now developed by a big community of [contributors](https://github.com/Leaflet/Leaflet/graphs/contributors). [Pull requests](https://github.com/Leaflet/Leaflet) are always welcome. However, there are many more ways to get involved with the development of Leaflet.

You can help the project tremendously by discovering and [reporting bugs](https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md#reporting-bugs), [improving documentation](https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md#improving-documentation), helping others on [Stack Overflow](https://stackoverflow.com/questions/tagged/leaflet), [GIS Stack Exchange](https://gis.stackexchange.com/questions/tagged/leaflet) and [GitHub issues](https://github.com/Leaflet/Leaflet/issues), tweeting to [@LeafletJS](https://twitter.com/LeafletJS) and spreading the word about Leaflet among your colleagues and friends.

Check out the [contribution guide](https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md) for more information on getting involved with Leaflet development.

<iframe src="https://ghbtns.com/github-btn.html?user=Leaflet&amp;repo=Leaflet&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="104px" height="20px" style="border: none;"></iframe>

 [Follow @LeafletJS](https://twitter.com/LeafletJS) 

<iframe src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fleafletjs.com&amp;layout=button_count&amp;show_faces=false&amp;width=93&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;height=35" scrolling="no" frameborder="0" allowtransparency="true" style="border: none; overflow: hidden; width: 93px; height: 20px;"></iframe>

© 2010–2019 [Vladimir Agafonkin](http://agafonkin.com/en). Maps © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.