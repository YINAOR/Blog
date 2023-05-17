import React, { useEffect } from 'react'

import styles from './style.module.css'

const ScrollText = ({ text, scrollPercentage = 0, repeatNum = 3, isltr = false }) => {
	let translateX

	const getTranslateX = () => {
		return isltr
			? `translateX(calc(${100 - scrollPercentage}vw - ${100 - scrollPercentage}% ))`
			: `translateX(calc(${scrollPercentage}vw - ${scrollPercentage}%))`
	}

	translateX = getTranslateX()

	return (
		<div className={styles.scroll_line}>
			<div className={styles.scroll_text} style={{ transform: translateX }}>
				{text.repeat(repeatNum)}
			</div>
		</div>
	)
}

export default ScrollText
