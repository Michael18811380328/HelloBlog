
# excalidraw 


#### version
0.6.4  


#### downloads
43 


#### repository
github.com/excalidraw/excalidraw-embed 


#### homepage
github.com/excalidraw/excalidraw-embed#readme 






* * *

**This library is deprecated.** Please use
[@excalidraw/excalidraw](https://www.npmjs.com/package/@excalidraw/excalidraw).

* * *

###  Excalidraw

[![npm](https://camo.githubusercontent.com/cc2a8b9c017d28bf6f69b78bcd7c13f0ee85d600d4242a4b72c0366eb78552de/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f657863616c6964726177)](https://camo.githubusercontent.com/cc2a8b9c017d28bf6f69b78bcd7c13f0ee85d600d4242a4b72c0366eb78552de/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f657863616c6964726177)
[![npm](https://camo.githubusercontent.com/f0d88271d87f170077952320d30b43955fea33fded80ff338f9a315b43ae1d48/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64742f657863616c6964726177)](https://camo.githubusercontent.com/f0d88271d87f170077952320d30b43955fea33fded80ff338f9a315b43ae1d48/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64742f657863616c6964726177)

Excalidraw exported as a component to directly embed in your projects

###  Installation

You can use npm

    
    
    npm install react react-dom excalidraw
    

or via yarn

    
    
    yarn add react react-dom excalidraw
    

After installation you will see the below font files in `dist` directory which
you will have to copy to the path from where assets are served. In the demo
its served from public folder.

    
    
    Cascadia.woff2
    FG_Virgil.woff2
    

###  Demo

[Try here](https://codesandbox.io/s/excalidraw-embed-f60f8)

###  Usage

    
    
    import React, { useState } from "react";
    import Excalidraw from "excalidraw";
    import InitialData from "./initialData";
    
    import "excalidraw/dist/excalidraw.min.css";
    import "./styles.css";
    
    export default function App() {
      const onChange = (elements, state) => {
        console.log("Elements :", elements, "State : ", state);
      };
    
      const onUsernameChange = (username) => {
        console.log("current username", username);
      };
      const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      const onResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      useEffect(() => {
        window.addEventListener("resize", onResize);
    
        return () => window.removeEventListener("resize", onResize);
      }, []);
    
      const { width, height } = dimensions;
      const options = { zenModeEnabled: true, viewBackgroundColor: "#AFEEEE" };
      return (
        <div className="App">
          <Excalidraw
            width={width}
            height={height}
            initialData={InitialData}
            onChange={onChange}
            options={options}
            user={{ name: "Excalidraw User" }}
            onUsernameChange={onUsernameChange}
          />
        </div>
      );
    }

[![Edit excalidraw-
embed](https://camo.githubusercontent.com/90808661433696bc57dce8d4ad732307b5cec6270e6b846f114dcd7ee7f9458a/68747470733a2f2f636f646573616e64626f782e696f2f7374617469632f696d672f706c61792d636f646573616e64626f782e737667)](https://codesandbox.io/s/excalidraw-
embed-f60f8?fontsize=14&hidenavigation=1&theme=dark)

###  Props

Name | Type | Default | Description  
---|---|---|---  
width | Number | window.innerWidth | The width of Excalidraw component  
height | Number | window.innerHeight | The height of Excalidraw component  
initialData | [ExcalidrawElement[]](https://github.com/excalidraw/excalidraw-embed/blob/58178c388ae577140a1c679b5733f33e3722498a/src/element/types.ts#L44) | [] | The initial data with which app loads.  
onChange | Function |  | This callback is triggered whenever the component updates due to any change. This callback will receive the excalidraw elements and the current app state.  
options | Object | Each option has a default value. See options section for more details | Options to be passed to Excalidraw  
user | { name?: string } |  | User details. The name refers to the name of the user to be shown  
onUsernameChange | Function |  | This callback is triggered whenever the username change. This callback receives the username.  
  
#####  width

This props defines the width of the Excalidraw component. Defaults to
`window.innerWidth` if not passed.

#####  height

This props defines the height of the Excalidraw component. Defaults to
`window.innerHeight` if not passed.

#####  initialData

This helps to load Excalidraw with `initialData`. Defaults to `[]`. This
should be array of
[ExcalidrawElement[]](https://github.com/excalidraw/excalidraw-
embed/blob/58178c388ae577140a1c679b5733f33e3722498a/src/element/types.ts#L44)
as shown below.

    
    
    [
      {
        type: "rectangle",
        version: 141,
        versionNonce: 361174001,
        isDeleted: false,
        id: "oDVXy8D6rom3H1-LLH2-f",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        angle: 0,
        x: 100.50390625,
        y: 93.67578125,
        strokeColor: "#000000",
        backgroundColor: "transparent",
        width: 186.47265625,
        height: 141.9765625,
        seed: 1968410350,
        groupIds: [],
      },
    ];

You might want to use this if you are using some backend to store the
excalidraw elements and want to preload excalidraw with those elements.

#####  onChange

Every time component updates, this callback if passed will get triggered and
has the below signature.

    
    
    onChange(ExcalidrawElement[], AppState)

Here you can try saving the data to your backend or local storage for example.

#####  options

These contains the options object with which you can control the initial
rendering of Excalidraw. Currently it only contains the below keys, more to be
added in future.

Name | type | default | Description  
---|---|---|---  
zenModeEnabled | boolean | false | Decides whether to enable zen mode  
viewBackgroundColor | string | #fff | The background color of Excalidraw  
  
Here is how you use it

    
    
    { zenModeEnabled: true, viewBackgroundColor: "AFEEEE" }

#####  user

This is the user name which shows during collaboration. Defaults to `{name:
''}`. This is Object as later more attributes like user cursor colors can also
be added.

#####  onUsernameChange

This callback if passed gets triggered whenever username changes and has the
below signature

    
    
    onUserNameChange(username);

###  Local Installation

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

####  Clone the repo

    
    
    git clone https://github.com/excalidraw/excalidraw-embed.git

####  Commands

Command | Description  
---|---  
`npm install` | Install the dependencies  
`npm start` | Run the project  
`npm run fix` | Reformat all files with Prettier  
`npm test` | Run tests  
`npm run test:update` | Update test snapshots  
`npm run test:code` | Test for formatting with Prettier  
  
##  Contributing

Currently this is a fork of
[excalidraw](https://github.com/excalidraw/excalidraw) and all the changes for
making it an embedable component are done on top of it. So for any changes,
please [open an issue](https://github.com/excalidraw/excalidraw-
embed/issues/new) first to discuss what you would like to change.





            