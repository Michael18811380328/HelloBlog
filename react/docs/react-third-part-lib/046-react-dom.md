
# react-dom 


#### version
18.3.1  


#### downloads
22,109,133 


#### repository
github.com/facebook/react 


#### homepage
reactjs.org/ 






# `react-dom`

This package serves as the entry point to the DOM and server renderers for
React. It is intended to be paired with the generic React package, which is
shipped as `react` to npm.

## Installation

    
    
    npm install react react-dom

## Usage

### In the browser

    
    
    import { createRoot } from 'react-dom/client';
    
    function App() {
      return <div>Hello World</div>;
    }
    
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);

### On the server

    
    
    import { renderToPipeableStream } from 'react-dom/server';
    
    function App() {
      return <div>Hello World</div>;
    }
    
    function handleRequest(res) {
      // ... in your server handler ...
      const stream = renderToPipeableStream(<App />, {
        onShellReady() {
          res.statusCode = 200;
          res.setHeader('Content-type', 'text/html');
          stream.pipe(res);
        },
        // ...
      });
    }

## API

### `react-dom`

See <https://reactjs.org/docs/react-dom.html>

### `react-dom/client`

See <https://reactjs.org/docs/react-dom-client.html>

### `react-dom/server`

See <https://reactjs.org/docs/react-dom-server.html>





            