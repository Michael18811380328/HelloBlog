
# react-i18next 


#### version
15.0.0  


#### downloads
3,435,992 


#### repository
github.com/i18next/react-i18next 


#### homepage
github.com/i18next/react-i18next 






# react-i18next


### IMPORTANT:

Master Branch is the newest version using hooks (>= v10).

    
    
    $ >=v10.0.0
    npm i react-i18next

**react-native: To use hooks within react-native, you must use react-native
v0.59.0 or higher**

For the legacy version please use the [v9.x.x
Branch](https://github.com/i18next/react-i18next/tree/v9.x.x)

    
    
    $ v9.0.10 (legacy)
    npm i react-i18next@legacy

### Documentation

The documentation is published on
[react.i18next.com](https://react.i18next.com) and PR changes can be supplied
[here](https://github.com/i18next/react-i18next-gitbook).

The general i18next documentation is published on
[www.i18next.com](https://www.i18next.com) and PR changes can be supplied
[here](https://github.com/i18next/i18next-gitbook).

### What will my code look like?

**Before:** Your react code would have looked something like:

    
    
    ...
    <div>Just simple content</div>
    <div>
      Hello <strong title="this is your name">{name}</strong>, you have {count} unread message(s). <Link to="/msgs">Go to messages</Link>.
    </div>
    ...

**After:** With the trans component just change it to:

    
    
    ...
    <div>{t('simpleContent')}</div>
    <Trans i18nKey="userMessagesUnread" count={count}>
      Hello <strong title={t('nameTitle')}>{{name}}</strong>, you have {{count}} unread message. <Link to="/msgs">Go to messages</Link>.
    </Trans>
    ...

### 📖 What others say

  * [How to properly internationalize a React application using i18next](https://locize.com/blog/react-i18next/) by Adriano Raiano
  * [I18n with React and i18next](https://alligator.io/react/i18n-with-react-and-i18next) via Alligator.io by Danny Hurlburt
  * [Ultimate Localization of React (Mobx) App with i18next](https://itnext.io/ultimate-localization-of-react-mobx-app-with-i18next-efab77712149) via itnext.io by Viktor Shevchenko
  * [Internationalization for react done right Using the i18next i18n ecosystem](https://reactjsexample.com/internationalization-for-react-done-right-using-the-i18next-i18n-ecosystem/) via reactjsexample.com
  * [How to translate React application with react-i18next](https://codetain.com/blog/how-to-translate-react-application-with-react-i18next/) via codetain.co by Norbert Suski
  * [Building i18n with Gatsby](https://www.gatsbyjs.org/blog/2017-10-17-building-i18n-with-gatsby/) via gatsbyjs.org by Samuel Goudie
  * [Get your react.js application translated with style](https://medium.com/@jamuhl/get-your-react-js-application-translated-with-style-4ad090aefc2c) by Jan Mühlemann
  * [Translate your expo.io / react-native mobile application](https://medium.com/@jamuhl/translate-your-expo-io-react-native-mobile-application-aa220b2362d2) by Jan Mühlemann
  * You're welcome to share your story...

### Why i18next?

  * **Simplicity:** no need to change your webpack configuration or add additional babel transpilers, just use create-react-app and go.
  * **Production ready** we know there are more needs for production than just doing i18n on the clientside, so we offer wider support on [serverside](https://www.i18next.com/overview/supported-frameworks) too (nodejs, php, ruby, .net, ...). **Learn once - translate everywhere**.
  * **Beyond i18n** comes with [locize](https://locize.com) bridging the gap between development and translations - covering the whole translation process.

[![ecosystem](https://raw.githubusercontent.com/i18next/i18next/master/assets/i18next-
ecosystem.jpg)](https://raw.githubusercontent.com/i18next/i18next/master/assets/i18next-
ecosystem.jpg)

### Localization workflow

Want to learn more about how seamless your internationalization and
translation process can be?

[![video](https://raw.githubusercontent.com/i18next/react-i18next/HEAD/example/locize/video_sample.png)](https://youtu.be/osScyaGMVqo)

[watch the video](https://youtu.be/osScyaGMVqo)

### Installation

Source can be loaded via [npm](https://www.npmjs.com/package/react-i18next) or
[downloaded](https://github.com/i18next/react-i18next/blob/master/react-i18next.min.js)
from this repo.

    
    
    # npm package
    $ npm install react-i18next
    

  * If you don't use a module loader it will be added to `window.reactI18next`

### Do you like to read a more complete step by step tutorial?

[Here](https://locize.com/blog/react-i18next/) you'll find a simple tutorial
on how to best use react-i18next. Some basics of i18next and some cool
possibilities on how to optimize your localization workflow.

### Examples

  * [Example react](https://github.com/i18next/react-i18next/tree/master/example/react)
  * [React examples with typescript](https://github.com/i18next/react-i18next/tree/master/example/react-typescript)
  * [Example locize.com](https://github.com/i18next/react-i18next/tree/master/example/locize)

#### v9 samples

  * [Example react](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/react)
  * [Example preact](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/preact)
  * [Example react-native](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/reactnative-expo)
  * [Example expo.io](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/reactnative-expo)
  * [Example next.js](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/nextjs)
  * [Example razzle](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/razzle-ssr)
  * [Example hashbase / beaker browser](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/dat)
  * [Example storybook](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/storybook)
  * [Example locize.com](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/locize)
  * [Example test with jest](https://github.com/i18next/react-i18next/tree/master/example/v9.x.x/test-jest)

### Requirements

  * react >= **16.8.0**
  * react-dom >= **16.8.0**
  * react-native >= **0.59.0**
  * i18next >= **10.0.0** (typescript users: >=17.0.9)

#### v9

  * react >= **0.14.0** (in case of < v16 or preact you will need to define parent in [Trans component](https://react.i18next.com/legacy-v9/trans-component#trans-props) or globally in [i18next.react options](https://react.i18next.com/legacy-v9/trans-component#additional-options-on-i-18-next-init))
  * i18next >= **2.0.0**

## Core Contributors

Thanks goes to these wonderful people ([emoji
key](https://github.com/kentcdodds/all-contributors#emoji-key)):

[![](https://avatars3.githubusercontent.com/u/977772?v=4?s=100)  
**Jan Mühlemann**](http://twitter.com/jamuhl)  
[💻](https://github.com/i18next/react-i18next/commits?author=jamuhl "Code") 💡 [👀](https://github.com/i18next/react-i18next/pulls?q=is%3Apr+reviewed-by%3Ajamuhl+ "Reviewed Pull Requests") [📖](https://github.com/i18next/react-i18next/commits?author=jamuhl "Documentation") 💬 |  [![](https://avatars0.githubusercontent.com/u/1086194?v=4?s=100)  
**Adriano Raiano**](http://twitter.com/#!/adrirai)  
[💻](https://github.com/i18next/react-i18next/commits?author=adrai "Code") 💡 [👀](https://github.com/i18next/react-i18next/pulls?q=is%3Apr+reviewed-by%3Aadrai+ "Reviewed Pull Requests") [📖](https://github.com/i18next/react-i18next/commits?author=adrai "Documentation") 💬 |  [![](https://avatars1.githubusercontent.com/u/12190482?v=4?s=100)  
**Pedro Durek**](https://github.com/pedrodurek)  
[💻](https://github.com/i18next/react-i18next/commits?author=pedrodurek "Code") 💡 [👀](https://github.com/i18next/react-i18next/pulls?q=is%3Apr+reviewed-by%3Apedrodurek+ "Reviewed Pull Requests") 💬 |  [![](https://avatars1.githubusercontent.com/u/49603590?v=4?s=100)  
**Tiger Abrodi**](https://tigerabrodi.dev/)  
[💻](https://github.com/i18next/react-i18next/commits?author=tigerabrodi
"Code") [👀](https://github.com/i18next/react-i18next/pulls?q=is%3Apr+reviewed-
by%3Atigerabrodi "Reviewed Pull Requests")  
---|---|---|---  
  
This project follows the [all-contributors](https://github.com/kentcdodds/all-
contributors) specification. Contributions of any kind are welcome!

* * *

**localization as a service - locize.com**

Needing a translation management? Want to edit your translations with an
InContext Editor? Use the original provided to you by the maintainers of
i18next!

[![locize](https://camo.githubusercontent.com/be5ad99e2d53866527b1b4e6a4ccf4504b57ba597fb4582fb55f5efecbb0db16/68747470733a2f2f6c6f63697a652e636f6d2f696d672f6164732f6769746875625f6c6f63697a652e706e67)](https://camo.githubusercontent.com/be5ad99e2d53866527b1b4e6a4ccf4504b57ba597fb4582fb55f5efecbb0db16/68747470733a2f2f6c6f63697a652e636f6d2f696d672f6164732f6769746875625f6c6f63697a652e706e67)

By using
[locize](http://locize.com/?utm_source=react_i18next_readme&utm_medium=github)
you directly support the future of i18next and react-i18next.
