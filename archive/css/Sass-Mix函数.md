# Sass-Mix()函数

sass 基本功能和使用参考 https://www.runoob.com/sass/sass-tutorial.html

## 问题提出

在项目中需要自定义一套主题色，那么相关的组件都需要对应的主题色。目前项目使用的是 reactstrap，默认的颜色是 primary, secondary, warning, success 等颜色，和项目自定义主题色不吻合。所以需要根据主题色，定制出对应的色阶，便于使用。

具体的色阶参考 bootstrap 官方网站：https://getbootstrap.com/docs/5.2/customize/color/

> Sass cannot programmatically generate variables, so we manually created variables for every tint and shade ourselves. We specify the midpoint value (e.g., `$blue-500`) and use custom color functions to tint (lighten) or shade (darken) our colors via Sass’s `mix()` color function.
>
> Using `mix()` is not the same as `lighten()` and `darken()`—the former blends the specified color with white or black, while the latter only adjusts the lightness value of each color. The result is a much more complete suite of colors, as [shown in this CodePen demo](https://codepen.io/emdeoh/pen/zYOQOPB).
>
> Our `tint-color()` and `shade-color()` functions use `mix()` alongside our `$theme-color-interval` variable, which specifies a stepped percentage value for each mixed color we produce. See the `scss/_functions.scss` and `scss/_variables.scss` files for the full source code.

## 解决思路

Mix 函数是将两种颜色根据一定的比例混合在一起，生成另一种颜色。其使用语法如下：

```scss
mix($color-1,$color-2,$weight);
```

$color-1 和 $color-2 指的是你需要合并的颜色，颜色可以是任何表达式，也可以是颜色变量。

$weight 为 合并的比例（选择权重），默认值为 50%，其取值范围是 0~1 之间。它是每个 RGB 的百分比来衡量，当然透明度也会有一定的权重。默认的比例是 50%，这意味着两个颜色各占一半，如果指定的比例是 25%，这意味着第一个颜色所占比例为 25%，第二个颜色所占比例为75%。

其使用方法也很简单：

```scss
mix(#f00, #00f) => #7f007f
mix(#f00, #00f, 25%) => #3f00bf
mix(rgba(255, 0, 0, 0.5), #00f) => rgba(63, 0, 191, 0.75)
```

在前面的基础上，做一个修改：

```scss
//SCSS
$color1: #a63;
$color2: #fff;
$bgColor1: #f36;
$bgColor2: #e36;
$borderColor1:#c36;
$borderColor2:#b36; .mix {
    background: mix($bgColor1,$bgColor2,.75);
    color: mix($color1,$color2,.25);
    border-color: mix($borderColor1,$bgColor2,.05);
}
```

编译的 css 代码：

```css
//CSS
.mix {
    background: #ee3366;
    color: #fefefe;
    border-color: #ed33
}
```

这就是 Mix 函数的工作原理，在函数中指定三个函数，前两个函数是你想混合的颜色（记住，你可以通过颜色变量、十六进制、RGBA、RGB、HSL 或者 HSLA 颜色值）。第三个参数是第一种颜色的比例值。

其他详细参考中文文档：https://www.sass.hk/guide/

## 实际使用

定义主题色变量

~~~scss
// theme color for bingbing's app
$bingbing-01: #FF8000;
$bingbing-02: #FFB600;

$theme-colors: (
	"primary": $primary,
	"secondary": $secondary,
	  
	"bingbing-01": $bingbing-01,
	"bingbing-02": $bingbing-02,
);
~~~

然后根据 mix 函数，把主题色 $value 和 #fff #000 白色黑色混入，获取到不同的色阶

~~~scss
@each $color, $value in $colors {
	@include bg-variant(".bg-#{$color}-lightest", mix($value, #fff, 10%));
	@include bg-variant(".bg-#{$color}-lighter", mix($value, #fff, 30%));
	@include bg-variant(".bg-#{$color}-light", mix($value, #fff, 70%));
	@include bg-variant(".bg-#{$color}-dark", mix($value, #000, 80%));
	@include bg-variant(".bg-#{$color}-darker", mix($value, #000, 40%));
	@include bg-variant(".bg-#{$color}-darkest", mix($value, #000, 20%));
}
~~~

把 scss 编译成 css 文件即可

~~~css
.btn-bingbing-01 {
  color: #fff;
  background-color: #ff8000;
  border-color: #ff8000
}

.btn-bingbing-01:hover {
  color: #fff;
  background-color: #d96d00;
  border-color: #c60
}

.btn-bingbing-01:focus,
.btn-bingbing-01.focus {
  box-shadow: 0 0 0 2px rgba(255, 128, 0, .5)
}

.btn-bingbing-01.disabled,
.btn-bingbing-01:disabled {
  color: #fff;
  background-color: #ff8000;
  border-color: #ff8000
}
~~~

