import Player from 'xgplayer';
// import FlvPlugin from 'xgplayer-flv'
import HlsJsPlugin from 'xgplayer-hls.js'
import LivePreset from 'xgplayer/es/presets/live'
import 'xgplayer/dist/index.min.css';
import styles from './index.module.scss'
import { useEffect } from 'react';
export default function Video() {
  useEffect(() => {
    let player = null as any
    if (HlsJsPlugin.isSupported()) {
      player = new Player({
        id: 'live-video',
        url: 'https://gcore.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
        // url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        // url: '/test/video321/flv/720/big_buck_bunny_720p_1mb.flv',
        width: '100%',
        height: 'auto',
        autoplay: true,
        enableContextmenu: true,
        screenShot: true, 
        miniprogress: true,
        ignores: ['playbackrate', 'pip'],
        presets: [LivePreset],
        // plugins: [FlvPlugin],
        // isLive: true,
        // hlsJsPlugin: {},
        // flv: {
        //   retryCount: 3, // 重试 3 次，默认值
        //   retryDelay: 1000, // 每次重试间隔 1 秒，默认值
        //   loadTimeout: 10000, // 请求超时时间为 10 秒，默认值
        //   fetchOptions: {
        //       // 该参数会透传给 fetch，默认值为 undefined
        //       mode: 'cors'
        //   }
        // },
        danmu: {
          comments: [
            {
              duration: 15000,
              id: '1',
              start: 2000,
              txt: '长弹幕长弹幕长弹幕长弹幕长弹幕',
              style: { //弹幕自定义样式
                color: '#000',
                fontSize: '20px',
                border: 'solid 1px #ff9500',
                borderRadius: '50px',
                padding: '5px 11px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }
          ],
        },
      })
    }
    return () => {
      player.destroy()
    }
  }, [])
  return (
    <div className={styles.root}>
      <div id="live-video"></div>
      {/* <video 
        ref={videoRef}
        id="live-video" 
        width={700} 
        height={'auto'}
        controls
        muted
      >
      </video> */}
    </div>
  )
}
