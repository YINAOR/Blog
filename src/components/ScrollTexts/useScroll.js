import { useState, useEffect } from 'react'

function useScroll(selector) {
	const [scrollPosition, setScrollPosition] = useState(0)
	const [pageHeight, setPageHeight] = useState(0)

	function handleScroll() {
		window.requestAnimationFrame(() => {
			setScrollPosition(window.scrollY)
		})
	}

	function handleResize() {
		setPageHeight(document.querySelector(selector)?.clientHeight || document.body.clientHeight)
	}

	useEffect(() => {
		console.log(999)
		// 监听滚动事件和窗口变化事件
		window.addEventListener('scroll', handleScroll)
		window.addEventListener('resize', handleResize)

		// 在组件卸载时移除监听
		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	// 计算页面滚动的百分比
	console.log(scrollPosition, pageHeight)
	const scrollPercentage = Math.round((scrollPosition / (pageHeight || 1)) * 100)

	return { scrollPosition, scrollPercentage, setPageHeight }
}

export default useScroll
