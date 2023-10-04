# @zxing/library 实现前端扫码功能

核心函数

1、listVideoInputDevices 获取摄像头设备得到一个摄像头设备数组，根据摄像头的id选择使用的摄像头

2、decodeFromInputVideoDeviceContinuously() 第一个参数为前面数组得到的摄像头的id，根据传入的摄像头id 选择摄像头扫描 ，id为null时 默认使用面向环境的摄像头

代码示例

~~~js
import React, { useEffect } from 'react'
import { Toast } from 'antd-mobile'
import { BrowserMultiFormatReader } from '@zxing/library'
import "./index.less"
export default function ScanCode (props) {
    const codeReader = new BrowserMultiFormatReader()
    useEffect(() => {
        openScan()
        return (() => {
            destoryScan()
        })
    }, [])
 
    const destoryScan = () => {
        codeReader.reset();
        codeReader.stopContinuousDecode();
    }
 
    const openScan = async () => {
        codeReader.listVideoInputDevices().then((videoInputDevices) => {
            console.log(videoInputDevices, 'videoInputDevices');
            // 获取第一个摄像头设备的名称
            let firstDeviceId = videoInputDevices[0].deviceId;
            const videoInputDeviceslablestr = JSON.stringify(videoInputDevices[0].label);
            if (videoInputDevices.length > 1) {
                // 判断是否后置摄像头
                if (videoInputDeviceslablestr.indexOf('back') > -1) {
                    firstDeviceId = videoInputDevices[0].deviceId;
                } else {
                    firstDeviceId = videoInputDevices[1].deviceId;
                }
            }
 
            decodeFromInputVideoFunc(firstDeviceId);
        }).catch(err => {
            // console.error(err);
        })
 
    }
 
    const decodeFromInputVideoFunc = (firstDeviceId) => {
        // firstDeviceId  为null 时默认选择面向环境的摄像头
        codeReader.decodeFromVideoDevice(firstDeviceId, 'video', (result, err) => {
            if (result) {
                Toast.show({
                    content: "扫描成功"
                })
                props.getResult(result.text)
                destoryScan()
            }
            if (err) {
                // console.error(err);
            }
        })
    }
 
    const backScan = () => {
        props.getResult('返回')
        destoryScan()
    }
    return (
        <div className="page-scan">
            <div className='back' onClick={backScan}><img src={require("../../assets/img/arrow_back.png").default} alt="" /> 返回</div>
            <div className="scan-box">
                <video id="video" className="scan-video" autoplay></video>
                <div className="qr-scanner">
                    <div className="box">
                        <div className="line"></div>
                        <div className="angle"></div>
                    </div>
                </div>
                <div className="scan-tip">扫描条形码</div>
            </div>
        </div>
    )
}

~~~



样式文件

~~~less
.scan-box {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        rgba(32, 255, 77, 0.1) 25%,
        rgba(32, 255, 77, 0.1) 26%,
        transparent 27%,
        transparent 74%,
        rgba(32, 255, 77, 0.1) 75%,
        rgba(32, 255, 77, 0.1) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        rgba(32, 255, 77, 0.1) 25%,
        rgba(32, 255, 77, 0.1) 26%,
        transparent 27%,
        transparent 74%,
        rgba(32, 255, 77, 0.1) 75%,
        rgba(32, 255, 77, 0.1) 76%,
        transparent 77%,
        transparent
      );
    background-size: 3rem 3rem;
    background-position: -1rem -1rem;
  }
  .back{
    font-size: 24px;
    color: #fff;
    font-weight: bolder;
    line-height: 50px;
    display: flex;
    align-items: center;
    z-index: 9999;
    position: fixed;
    top: 30px;
    left: 20px;
    img{
        width: 40px;
        height: 40px;
    }
  }
  
  .scan-video {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
  
  .qr-scanner .box {
    width: 500px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border: 0.1rem solid rgba(0, 255, 51, 0.2);
    background: url('http://resource.beige.world/imgs/gongconghao.png') no-repeat center center;
  }
  
  .qr-scanner .line {
    height: calc(100% - 2px);
    width: 100%;
    background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
    border-bottom: 3px solid #00ff33;
    transform: translateY(-100%);
    animation: radar-beam 2s infinite alternate;
    animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
    animation-delay: 1.4s;
  }
  
  .qr-scanner .box:after,
  .qr-scanner .box:before,
  .qr-scanner .angle:after,
  .qr-scanner .angle:before {
    content: "";
    display: block;
    position: absolute;
    width: 3vw;
    height: 3vw;
    border: 0.2rem solid transparent;
  }
  
  .qr-scanner .box:after,
  .qr-scanner .box:before {
    top: 0;
    border-top-color: #00ff33;
  }
  
  .qr-scanner .angle:after,
  .qr-scanner .angle:before {
    bottom: 0;
    border-bottom-color: #00ff33;
  }
  
  .qr-scanner .box:before,
  .qr-scanner .angle:before {
    left: 0;
    border-left-color: #00ff33;
  }
  
  .qr-scanner .box:after,
  .qr-scanner .angle:after {
    right: 0;
    border-right-color: #00ff33;
  }
  
  @keyframes radar-beam {
    0% {
      transform: translateY(-100%);
    }
  
    100% {
      transform: translateY(0);
    }
  }
  
  .scan-tip {
    width: 100vw;
    text-align: center;
    margin-bottom: 5vh;
    color: white;
    font-size: 5vw;
    position: absolute;
    bottom: 50px;
    left: 0;
    color: #fff;
  }
  
  .page-scan {
    overflow-y: hidden;
    z-index: 999;
  }
~~~

