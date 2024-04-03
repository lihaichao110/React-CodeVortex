import { useEffect } from "react";
import styles from "./index.module.scss";
import { Viewer, utils } from "@photo-sphere-viewer/core";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import "@photo-sphere-viewer/core/index.css";
import '@photo-sphere-viewer/markers-plugin/index.css';

const animatedValues = {
  pitch: { start: -Math.PI / 2, end: 0 },
  yaw: { start: Math.PI / 2, end: 0 },
  zoom: { start: 0, end: 50 },
  maxFov: { start: 130, end: 90 },
  fisheye: { start: 2, end: 0 },
};

export default function PanoramaVr() {
  const baseUrl = "https://photo-sphere-viewer-data.netlify.app/assets/";
  useEffect(() => {
    const viewer = new Viewer({
      container: document.querySelector("#viewer")! as HTMLElement, // 展示元素
      panorama: baseUrl + "sphere.jpg", // 图像地址
      loadingImg: baseUrl + "loader.gif", // 加载loading图像
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      description: document.querySelector("#description")?.innerHTML,
      caption: "VR看房", // 导航栏文本，允许使用html
      lang: {
        // 按钮hover对应文字
        fullscreen: "全屏",
        loading: "加载中...",
        close: "关闭",
        ctrlZoom: "按住 ctrl + 鼠标滚轮进行图像缩放",
      },
      navbar: [
        "zoom",
        {
          content: '截屏',
          onClick(viewer) {
              viewer.addEventListener('render', () => {
                  const link = document.createElement('a');
                  link.download = 'screenshot.png';
                  // @ts-ignore
                  link.href = viewer.renderer.renderer.domElement.toDataURL();
                  link.click();
              }, { once: true });
              viewer.needsUpdate();
          },
        },
        "caption",
        {
          title: "重置",
          content: "重置",
          onClick: reset,
        },
        "description",
        "fullscreen",
      ],
      plugins: [
        [
          AutorotatePlugin,
          {
            autostartDelay: null,
            autostartOnIdle: false,
            autorotatePitch: 0,
          },
        ],
        [MarkersPlugin, {
          markers: [
            {
                id: 'video-greenscreen',
                videoLayer: baseUrl + 'pictos/t-rex.mp4',
                position: { yaw: -0.3, pitch: 0 },
                size: { width: 500, height: 500 },
                chromaKey: {
                    enabled: true,
                    color: '#009200',
                    similarity: 0.1,
                },
            },
            {
              id: 'custom-tooltip',
              tooltip: {
                content: document.querySelector('#tooltip-content')!.innerHTML,
                className: 'custom-tooltip',
                position: 'top',
                trigger: 'click',
              },
              position: { pitch: 0.21, yaw: 0.55 },
              image: baseUrl + 'pictos/pin-blue.png',
              size: { width: 32, height: 32 },
              anchor: 'bottom center',
            }
          ]
        }],
      ],
    });

    const autorotate = viewer.getPlugin(AutorotatePlugin) as any;
    let isInit = true;

    // const markersPlugin = viewer.getPlugin(MarkersPlugin) as any

    viewer.addEventListener(
      "ready",
      () => {
        viewer.navbar.hide();

        if (isInit) {
          intro(animatedValues.pitch.end, animatedValues.pitch.end);
        }
        // viewer
        // .animate({
        //     yaw: 0,
        //     pitch: 0.5,
        //     speed: 1000,
        // })
        // .then(() => {
        //     markersPlugin.showMarkerTooltip('custom-tooltip');
        // });
      },
      { once: true }
    );

    // launch animation to clicked point
    viewer.addEventListener("click", ({ data }) => {
      if (isInit) {
        intro(data.pitch, data.yaw);
      }
    });

    function intro(pitch: any, yaw: any) {
      isInit = false;
      // autorotate.stop();
      viewer.navbar.hide();

      new utils.Animation({
        properties: {
          ...animatedValues,
          pitch: { start: animatedValues.pitch.start, end: pitch },
          yaw: { start: animatedValues.yaw.start, end: yaw },
        },
        duration: 2500,
        easing: "inOutQuad",
        onTick: (properties) => {
          viewer.setOptions({
            fisheye: properties.fisheye,
            maxFov: properties.maxFov,
          });
          viewer.rotate({ yaw: properties.yaw, pitch: properties.pitch });
          viewer.zoom(properties.zoom);
        },
      }).then(() => {
        // autorotate.start();
        viewer.navbar.show();
        viewer.setOptions({
          mousemove: true,
          mousewheel: true,
        });
      });
    }

    function reset() {
      isInit = true;
      autorotate.stop();
      viewer.navbar.hide();
      viewer.setOptions({
        mousemove: false,
        mousewheel: false,
      });

      new utils.Animation({
        properties: {
          pitch: {
            start: viewer.getPosition().pitch,
            end: animatedValues.pitch.start,
          },
          yaw: {
            start: viewer.getPosition().yaw,
            end: animatedValues.yaw.start,
          },
          zoom: {
            start: viewer.getZoomLevel(),
            end: animatedValues.zoom.start,
          },
          maxFov: {
            start: animatedValues.maxFov.end,
            end: animatedValues.maxFov.start,
          },
          fisheye: {
            start: animatedValues.fisheye.end,
            end: animatedValues.fisheye.start,
          },
        },
        duration: 1500,
        easing: "inOutQuad",
        onTick: (properties: any) => {
          viewer.setOptions({
            fisheye: properties.fisheye,
            maxFov: properties.maxFov,
          });
          viewer.rotate({ yaw: properties.yaw, pitch: properties.pitch });
          viewer.zoom(properties.zoom);
        },
      });
    }
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className="panorama-vr">
        <div id="viewer"></div>
        {/* <div id="key-biscayne" style={{width: '100%', height: '100%'}}></div> */}

        <div id="description">
          <h2>VR看房到底有什么优势：</h2>
          <br></br>1.
          逼真的沉浸感：通过虚拟现实技术，VR看房能够为用户提供逼真的房屋环境和场景，让用户有身临其境的感觉。用户可以360度自由观察和导航，感受房屋的真实大小、布局和空间感。
          <br />
          2.
          时间和地理限制的突破：VR看房不受时间和地理的限制，用户可以随时随地通过VR设备进行房屋浏览，无需亲自到场。这为用户节省了不少时间和精力，特别是对于那些需要远距离选择房屋的用户来说，更是方便快捷的选择。
          <br />
          3.
          全面的信息展示：VR看房可以将房屋的细节和特点展示给用户，包括装修风格、家具摆设、房间功能等。用户可以更全面地了解房屋的各个方面，提前预览房屋的特点和优势，有助于做出更准确的决策。
          <br />
          4.
          个性化的体验：VR看房可以根据用户的需求和互动选择，实现个性化的体验。用户可以自由切换不同的视角、布置风格，根据自己的喜好和需求进行定制化的观看。这种个性化的体验能够提高用户参与度和满意度。
          <br />
          5.
          节约成本：VR看房可以帮助用户在选择之前进行初步的筛选，减少现场实地看房的次数，从而减少了不必要的交通费用和时间成本。对于开发商和房产中介来说，也可以减少现场看房的安排和人员成本。总的来说，VR看房通过逼真的沉浸感、时间地理限制的突破、全面信息展示和个性化体验等优势，为用户提供了方便、真实和高质量的房屋浏览体验。
        </div>

        <div id="tooltip-content">
          <img src="https://photo-sphere-viewer-data.netlify.app/assets/sphere-small.jpg" />
          <article>
            <h2>喜马拉雅山</h2>
            <p>
              Vivamus magna. Cras in mi at felis aliquet
              congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
              tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
