# react-responsive

可以使用这个库代替 css 的媒体查询，更方便的处理移动端网页。

~~~bash
# install
npm install react-responsive --save
~~~

基本使用

~~~jsx
import MediaQuery form 'react-responsive';

const Example = () => (
  <div>
  	<MediaQuery query="(min-device-width: 1224px)">
  		<span>You are a desktop</span>
  	</MediaQuery>
  	<MediaQuery query="(max-device-width: 1224px)">
  		<span>You are sized a mobile phone though</span>
  	</MediaQuery>
  </div>
);

// 1224 means 1224px
const Example2 = () => (
  <MediaQuery minDeviceWidth={1224}></MediaQuery>
  <MediaQuery maxDeviceWidth={1224}></MediaQuery>
);
~~~

common use case

~~~jsx
import Respnosive from 'react-responsive';

const Desktop = props => (<Responsive {...props} minWidth={992}/>);
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991}/>;
const Mobile = props => <Responsive {...props} maxWidth={767}/>;
const Default = props => <Responsive {...props} minWidth={768}/>;

const Example = () => {
  <div>
    <Desktop></Desktop>
  	<Tablet></Tablet>
  	<Mobile></Mobile>
  	<Default></Default>
  </div>
};

export default Example;
~~~


