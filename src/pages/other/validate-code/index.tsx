import styles from "./index.module.scss";
import { useEffect } from "react";
import imgUrl from '@/assets/imgs/login/loginBgc.jpg'
import { message } from 'antd'
class Init {
  boxW: number;
  boxH: number;
  bigw: number;
  bigh: number;
  smallw: number;
  smallh: number;
  errorValue: number;
  x: number;
  y: number;
  handleInit: () => void;
  constructor(
    element: HTMLElement,
    successCallback?: any,
    errorCallback?: any,
    imgs?: string
  ) {
    (this.boxW = element.offsetWidth), (this.boxH = element.offsetHeight);
    this.bigw = this.boxW;
    this.bigh = this.boxH - 60;
    this.smallw = 70;
    this.smallh = this.boxH - 60;
    this.errorValue = 5;
    this.x = 200;
    this.y = 200;

    // 创建canvas背景
    const canvasBgDom = document.querySelector("#canvasbg");
    canvasBgDom && element.removeChild(canvasBgDom!);
    const canvasbg = document.createElement("canvas");
    canvasbg.setAttribute("id", "canvasbg");
    canvasbg.setAttribute("width", this.bigw + "");
    canvasbg.setAttribute("height", this.bigh + "");
    element.appendChild(canvasbg);

    // 创建canvas滑块
    const canvasDom = document.querySelector("#canvas");
    canvasDom && element.removeChild(canvasDom!);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", this.smallw + "");
    canvas.setAttribute("height", this.smallh + "");
    element.appendChild(canvas);

    // 创建下方滑块轨迹
    const codecanvas = document.createElement("canvas");
    codecanvas.setAttribute("id", "codecanvas");
    codecanvas.setAttribute("width", "50");
    codecanvas.setAttribute("height", "50");
    element.appendChild(codecanvas);
    const code = document.createElement("div");
    code.setAttribute("class", "code");
    code.appendChild(codecanvas);
    const codebox = document.createElement("div");
    codebox.setAttribute("class", "codebox");
    codebox.appendChild(code);
    const bottomCodeDom = document.querySelector(".bottomcode")
    bottomCodeDom && element.removeChild(bottomCodeDom!);
    const bottomcode = document.createElement("div");
    bottomcode.setAttribute("class", "bottomcode");
    bottomcode.appendChild(codebox);
    element.appendChild(bottomcode);

    // 处理图片问题
    let imgsrc = "";
    const handleImgs = () => {
      if (imgs) {
        const index = handleRandom(0)
        console.log(index);
        imgsrc = imgs
      } else {
        // 默认图片源自己搞定
        imgsrc = "";
      }
    }

    // 处理canvas背景
    const ctxbg = canvasbg.getContext("2d")!;

    const drawBg = () => {
      ctxbg.save();
      const imgbg = new Image();
      imgbg.src = imgsrc;
      imgbg.onload = () => {
        ctxbg.drawImage(imgbg, 0, 0, this.bigw, this.bigh);
        // 凹陷图形拼图形状
        ctxbg.beginPath();
        ctxbg.moveTo(this.x, this.y);
        ctxbg.lineTo(this.x + 15, this.y);
        ctxbg.arc(this.x + 25, this.y, 10, Math.PI, 2 * Math.PI, false);
        ctxbg.lineTo(this.x + 50, this.y);
        ctxbg.lineTo(this.x + 50, this.y + 15);
        ctxbg.arc(
          this.x + 50,
          this.y + 25,
          10,
          (Math.PI * 3) / 2,
          Math.PI / 2,
          false
        );
        ctxbg.lineTo(this.x + 50, this.y + 50);
        ctxbg.lineTo(this.x, this.y + 50);
        ctxbg.lineTo(this.x, this.y + 50 - 15);
        ctxbg.arc(
          this.x,
          this.y + 25,
          10,
          Math.PI / 2,
          (Math.PI * 3) / 2,
          true
        );
        ctxbg.lineTo(this.x, this.y);
        ctxbg.fillStyle = "rgba(255,255,255,0.8)";
        ctxbg.fill();
      };
    };

    //处理canvas滑块
    // let canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d")!;

    // 拼图形状
    const drawCode = () => {
      ctx.save();

      const heart = new Path2D();
      heart.moveTo(0, this.y);
      heart.lineTo(0 + 15, this.y);
      heart.arc(0 + 25, this.y, 10, Math.PI, 2 * Math.PI, false);
      heart.lineTo(0 + 50, this.y);
      heart.lineTo(0 + 50, this.y + 15);
      heart.arc(0 + 50, this.y + 25, 10, (Math.PI * 3) / 2, Math.PI / 2, false);
      heart.lineTo(0 + 50, this.y + 50);
      heart.lineTo(0, this.y + 50);
      heart.lineTo(0, this.y + 50 - 15);
      heart.arc(0, this.y + 25, 10, Math.PI / 2, (Math.PI * 3) / 2, true);
      heart.lineTo(0, this.y);
      ctx.clip(heart);
      const img = new Image();
      img.src = imgsrc;
      img.onload = () => {
        // ctx.drawImage(img, x, y, 50, 50, 0, y, 50, 50);
        const imgw = img.width;
        const imgh = img.height;
        ctx.drawImage(
          img,
          (this.x / this.bigw) * imgw,
          0,
          (this.smallw / this.bigw) * imgw,
          (this.smallh / this.bigh) * imgh,
          0,
          0,
          this.smallw,
          this.smallh
        );
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 2;
        ctx.stroke(heart);
      };
    };

    // 处理滑块鼠标事件
    let flag = false;
    canvas.onmousedown = () => {
      flag = true;
    };
    const body = document.getElementsByTagName("body")[0];
    body.onmouseup = () => {
      if (flag) {
        flag = false;
        if (
          canvas.offsetLeft > this.x - this.errorValue &&
          canvas.offsetLeft < this.x + this.errorValue
        ) {
          if (successCallback) {
            successCallback();
          } else {
            fixCodeBox("success");
            wait(() => {
              fixCanvasCoordinate(0);
            }, 1000);
          }
        } else {
          if (errorCallback) {
            errorCallback();
          } else {
            fixCodeBox("error");
            wait(() => {
              fixCanvasCoordinate(0);
            }, 1000);
          }
        }
      }
    };
    body.onmousemove = (e) => {
      if (flag) {
        const left = e.clientX - canvasbg.getBoundingClientRect().left;

        if (left > this.bigw - this.smallw / 2) {
          return false;
        }
        if (left < this.smallw / 2) {
          return false;
        }
        fixCanvasCoordinate(left - this.smallw / 2);
      }
    };
    // 处理下方滑块鼠标事件
    const codeBox = document.querySelector(".codebox")! as HTMLElement;
    const codeBoxWidth = codeBox.offsetWidth;
    // let code = document.querySelector(".code");
    code.onmousedown = () => {
      flag = true;
    };

    // 修改下方滑块轨迹颜色
    function fixCodeBox(type: string) {
      if (type == "success") {
        codeBox.style.background = "rgb(63, 247, 78)";
      } else if (type == "error") {
        codeBox.style.background = "rgb(223, 86, 161)";
      } else {
        codeBox.style.background = "rgb(0,150,200)";
      }
    }
    // 修改canvas位置
    const fixCanvasCoordinate = (num = 0) => {
      canvas.style.left = num + "px";
      codeBox.style.width = codeBoxWidth + num + "px";
    };

    function wait(func: any, time: number) {
      const timer = setTimeout(() => {
        func();
        fixCodeBox('');
        clearTimeout(timer);
      }, time);
    }
    // 随机整数，最小值和范围
    function handleRandom(min: number, range = 10) {
      return Math.floor(Math.random() * (range + 1) + min);
    }
    //绘制箭头
    // let codecanvas = document.getElementById("codecanvas");
    const codecanvastx = codecanvas.getContext("2d")!;
    function drawArrow() {
      codecanvastx.moveTo(10, 23);
      codecanvastx.lineTo(30, 23);
      codecanvastx.lineTo(30, 18);
      codecanvastx.lineTo(40, 25.5);
      codecanvastx.lineTo(30, 33);
      codecanvastx.lineTo(30, 28);
      codecanvastx.lineTo(10, 28);
      codecanvastx.lineTo(10, 23);
      codecanvastx.fillStyle = "rgba(0,0,0,0.8)";
      codecanvastx.fill();
    }

    this.handleInit = () => {
      fixCanvasCoordinate(0);
      // 初始化
      ctx.restore();
      ctxbg.restore();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctxbg.clearRect(0, 0, canvasbg.width, canvasbg.height);
      this.x = handleRandom(100, this.bigw - 100 - this.smallw);
      this.y = handleRandom(70, this.bigh - 70 - this.smallw);
      handleImgs();
      drawArrow();
      drawBg();
      drawCode();
    };

    this.x = handleRandom(100, this.bigw - 100 - this.smallw);
    this.y = handleRandom(70, this.bigh - 70 - this.smallw);
    handleImgs();
    drawArrow();
    drawBg();
    drawCode();
  }
}

export default function ValidateCode() {
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    const successCallback=()=>{
      messageApi.success("验证成功")
      init.handleInit()
    }
    const errorCallback=()=>{
        messageApi.error("验证失败")
        init.handleInit()
    }
    const init = new Init(
      document.querySelector(".validate-box")!,
      successCallback,
      errorCallback,
      imgUrl
      );
    init.handleInit()
  }, [messageApi])
  
  return (
    <div className={styles.root}>
      {contextHolder}
      <div className="validate-box"></div>
    </div>
  );
}
