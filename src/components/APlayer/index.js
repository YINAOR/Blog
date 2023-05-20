import React from 'react'
// import ReactAplayer from 'react-aplayer'
import BrowserOnly from '@docusaurus/BrowserOnly'
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import ColorThief from './color-thief'
import './style.css'

let ReactAplayer
if(ExecutionEnvironment.canUseDOM) {
  ReactAplayer = require('react-aplayer').default
}

const setTheme = (ap, index) => {
	const colorThief = new ColorThief()
	const image = new Image()
	const xhr = new XMLHttpRequest()

	if (!ap.list.audios[index].theme) {
		xhr.onload = function () {
			let coverUrl = URL.createObjectURL(this.response)
			image.onload = function () {
				let color = colorThief.getColor(image)
				ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index)
				URL.revokeObjectURL(coverUrl)
			}
			image.src = coverUrl
		}
		xhr.open('GET', ap.list.audios[index].cover, true)
		xhr.responseType = 'blob'
		xhr.send()
	}
}

export default class App extends React.Component {
	// event binding example
	onPlay = () => {
		console.log('on play')
	}

	onPause = () => {
		console.log('on pause')
	}

	// example of access aplayer instance
	onInit = ap => {
		this.ap = ap
		setTheme(ap, ap.list.index)
		ap.on('listswitch', index => {
			setTheme(ap, index)
		})
	}

	render() {
		const { name, artist, url, cover, lrc } = this.props
		const props = {
			lrcType: 3,
			loop: 'none',
			audio: [
				{
					name,
					artist,
					url,
					cover,
					lrc
				}
			]
		}

		return (
			<div className="custom-aplayer">
				<BrowserOnly>{() => <ReactAplayer {...props} onInit={this.onInit} onPlay={this.onPlay} onPause={this.onPause} />}</BrowserOnly>
				{/* example of access aplayer instance API */}
				{/* <button onClick={() => this.ap.toggle()}>toggle</button> */}
			</div>
		)
	}
}
