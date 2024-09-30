# streamsaver

用于文件保存

[https://www.npmjs.com/package/streamsaver](https://www.npmjs.com/package/streamsaver "https://www.npmjs.com/package/streamsaver")

[https://github.com/jimmywarting/StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js "https://github.com/jimmywarting/StreamSaver.js")

4K stars

周下载量3万

```javascript
<script src="https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/StreamSaver.min.js"></script>
<script>
  import streamSaver from 'streamsaver'
  const streamSaver = require('streamsaver')
  const streamSaver = window.streamSaver
</script>
<script>
  const uInt8 = new TextEncoder().encode('StreamSaver is awesome')

  // streamSaver.createWriteStream() returns a writable byte stream
  // The WritableStream only accepts Uint8Array chunks
  // (no other typed arrays, arrayBuffers or strings are allowed)
  const fileStream = streamSaver.createWriteStream('filename.txt', {
    size: uInt8.byteLength, // (optional filesize) Will show progress
    writableStrategy: undefined, // (optional)
    readableStrategy: undefined  // (optional)
  })

  if (manual) {
    const writer = fileStream.getWriter()
    writer.write(uInt8)
    writer.close()
  } else {
    // using Response can be a great tool to convert
    // mostly anything (blob, string, buffers) into a byte stream
    // that can be piped to StreamSaver
    //
    // You could also use a transform stream that would sit
    // between and convert everything to Uint8Arrays
    new Response('StreamSaver is awesome').body
      .pipeTo(fileStream)
      .then(success, error)
  }
</script>
```

​


