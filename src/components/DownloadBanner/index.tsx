import { ReactNode } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import appStore from "../../assets/images/appStore.svg"
import googlePlay from "../../assets/images/googlePlay.svg"

import 'react-circular-progressbar/dist/styles.css';
import './styles.scss';
import { motion } from 'framer-motion';

interface DownloadComponentProps {
}

const percentage = 100;

export function DownloadBanner({  }: DownloadComponentProps) {
  return (
    <motion.div 
    className="download-banner"
    initial={{opacity:0}}
    animate={{ opacity: 1 }}
    transition={{duration: 0.5}}
    >
      <div className="banner-left">
        <h2>You did a great job Ambrósio!</h2>
        <p>download our app and start training!</p>
        <div className="row">
          <img src={appStore} alt="app store" />
          <img src={googlePlay} alt="google play" />
        </div>
      </div>
      <div>
        <div className="performance">
          <span>Average</span>
          <div>
            <CircularProgressbar 
            value={percentage} 
            text={`${percentage}`} 
            styles={{trail: {  strokeLinecap: 'butt'}, path:{strokeLinecap: 'butt', transition: 'stroke-dashoffset 0.1s ease 0s'}}}
            maxValue={150}
            />
          </div>
        </div>
        <button>Retry</button>
      </div>
    </motion.div>
  );
};


