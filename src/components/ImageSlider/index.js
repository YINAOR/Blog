import React, { useEffect, useRef } from 'react'
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
// import Flickity from 'flickity'
// import 'flickity-imagesloaded'
// import 'flickity/dist/flickity.min.css'
// import { ImageSliderWrapper } from './style'

const ImageSlider = ({ images, splitLen }) => {
	const sliderRef = useRef(null)
	let flickityInstance

	useEffect(() => {
		let Flickity
		if (ExecutionEnvironment.canUseDOM) {
			Flickity = require('flickity')
			require('flickity-imagesloaded')
			require('flickity/dist/flickity.min.css')
		}
		if (Flickity && sliderRef && sliderRef.current) {
			// 初始化Flickity实例
			flickityInstance = new Flickity(sliderRef.current, {
				adaptiveHeight: true,
				selectedAttraction: 0.01,
				friction: 0.2,
				cellAlign: 'left',
				imagesLoaded: true,
				contain: true,
				wrapAround: false,
				dragThreshold: 10,
				draggable: true,
				prevNextButtons: !splitLen,
				pageDots: !splitLen
			})
		}

		// 组件卸载时销毁实例
		return () => {
			if (flickityInstance) {
				flickityInstance.destroy()
			}
		}
	}, [])

	return (
		<div className="carousel-wrapper" ref={sliderRef}>
			{images?.map((url, index) => (
				<div className="carousel-cell" key={index} style={{ width: 'calc(' + 100 / splitLen + '% - ' + 10 * (splitLen - 1) + 'px)' }}>
					<img src={url} />
				</div>
			))}
		</div>
	)
}

export default ImageSlider
