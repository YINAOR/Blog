import React, { useEffect } from 'react'
import ScrollText from './ScrollText.js'
import styles from './style.module.css'
import useScroll from './useScroll'

const ScrollTexts = ({ items }) => {
	const { scrollPosition, scrollPercentage, setPageHeight } = useScroll('#__docusaurus')

	useEffect(() => {
		setPageHeight(document.querySelector('#__docusaurus').clientHeight)
	}, [])

	return (
		<div className={styles.scroll_container}>
			{items?.map((item, index) => (
				<ScrollText key={index} text={item.text.toUpperCase()} repeatNum={item.repeatNum} isltr={item.isltr} scrollPercentage={scrollPercentage} />
			))}
		</div>
	)
}

export default ScrollTexts
