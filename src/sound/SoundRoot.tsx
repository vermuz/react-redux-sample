import React = require('react');
var Sound = require('react-sound');

interface Props {
}

export default class SoundRoot extends React.Component<Props, {}> {

    render() {
        return (
            <div>
                <h2>Sound</h2>
                <Sound
                    url="public/sample.mp3"
                    playStatus={Sound.status.PLAYING}
                    playFromPosition={300 /* in milliseconds */}
                    onLoading={() => console.log("loading")}
                    onPlaying={() => console.log("playing")}
                    onFinishedPlaying={() => console.log("finish")} />
            </div>
        )
    }
}