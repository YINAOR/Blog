import React from 'react'
import KeepAlive from 'react-activation'
import Layout from '@theme/Layout'
import Hero from '@site/src/components/Hero'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './styles.module.css'

function Home() {
	const context = useDocusaurusContext()
	const { siteConfig = {} } = context

	// React.useEffect(() => {
	// 	import('./homeMain.js').then(res => {
	// 		res.initBackground()
	// 	})
	// }, [])

	return (
		<React.Fragment>
			{/* <div className={styles.warpper}>
					<canvas id="background" className={styles.background}></canvas>
					<div className={styles.wrap}>
						<h2 className={styles.contentTitle}>YINAOR</h2>
					</div>
				</div> */}

			<Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
				<Hero />
			</Layout>
		</React.Fragment>
	)
}

export default Home
