
# autoprefixer 


#### version
10.4.19  


#### downloads
19,706,597 


#### repository
github.com/postcss/autoprefixer 


#### homepage
github.com/postcss/autoprefixer#readme 






# Autoprefixer [![Cult Of
Martians](https://camo.githubusercontent.com/253e85a9b7dea62bb3afabae0f6a507f84f685dd389698b504660345d96be072/68747470733a2f2f63756c746f666d61727469616e732e636f6d2f6173736574732f6261646765732f62616467652e737667)](https://cultofmartians.com/tasks/autoprefixer-
grid.html)

[![](https://camo.githubusercontent.com/2094056b09fb1377d966dcdb6d18bf58aa3d17d2eb40c923657224d75323df62/68747470733a2f2f706f73746373732e6769746875622e696f2f6175746f70726566697865722f6c6f676f2e737667)](https://camo.githubusercontent.com/2094056b09fb1377d966dcdb6d18bf58aa3d17d2eb40c923657224d75323df62/68747470733a2f2f706f73746373732e6769746875622e696f2f6175746f70726566697865722f6c6f676f2e737667)

[PostCSS](https://github.com/postcss/postcss) plugin to parse CSS and add
vendor prefixes to CSS rules using values from [Can I
Use](https://caniuse.com/). It is recommended by Google and used in Twitter
and Alibaba.

Write your CSS rules without vendor prefixes (in fact, forget about them
entirely):


​    
​    ::placeholder {
​      color: gray;
​    }
​    
    .image {
      background-image: url(image@1x.png);
    }
    @media (min-resolution: 2dppx) {
      .image {
        background-image: url(image@2x.png);
      }
    }

Autoprefixer will use the data based on current browser popularity and
property support to apply prefixes for you. You can try the [interactive
demo](https://autoprefixer.github.io/) of Autoprefixer.


​    
​    ::-moz-placeholder {
​      color: gray;
​    }
​    ::placeholder {
​      color: gray;
​    }
​    
    .image {
      background-image: url(image@1x.png);
    }
    @media (-webkit-min-device-pixel-ratio: 2),
           (min-resolution: 2dppx) {
      .image {
        background-image: url(image@2x.png);
      }
    }




## Docs

Read full docs **[here](https://github.com/postcss/autoprefixer#readme)**.





​            