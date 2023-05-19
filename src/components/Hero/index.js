import React from 'react'

import { useTrail, animated } from 'react-spring'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'

import HeroMain from './hero_main.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeixin } from '@fortawesome/free-brands-svg-icons'
import useBaseUrl from '@docusaurus/useBaseUrl'

import styles from './styles.module.css'

function Hero() {
	const {
		// 当前语言
		i18n: { currentLocale }
	} = useDocusaurusContext()

	// animation
	const animatedTexts = useTrail(4, {
		from: { opacity: 0, transform: 'translateY(3em)' },
		to: { opacity: 1, transform: 'translateY(0)' },
		config: {
			mass: 3, // 弹簧质量，即：与动画的加速度有关，mass的值越大，动画执行的速度也会随着执行的时间越变越大
			friction: 45, // 摩擦力(阻力)，即动画执行时的反向加速度，可以与mass、tension的效果相互抵消
			tension: 460 // 弹簧张力，影响整体速度，即：动画在有一个点向下一个点运动时，递增的步长(受张力影响)如果过大，就会一下子超过范围，在下一点回来时又会距离终点较远，导致在同一点周围来回运动，即使是线性运动的过渡效果，设置tension之后可以实现曲线运动
		}
	})

	return (
		<animated.div className={styles.hero}>
			<div className={styles.bloghome__intro}>
				<animated.div style={animatedTexts[0]} className={styles.hero_text}>
					<Translate description="hero greet">Hello! 我是</Translate>
					<span className={styles.intro__name}>
						<div className={styles.name_wrapper}>
							<span className={styles.name_up} style={{ '--i': -15 }}>
								YINAOR
							</span>
							<span className={styles.name_down} style={{ '--i': 18 }}>
								YINAOR
							</span>
							<span className={styles.name_hidden_container}>
								<span className={styles.name_hidden}>YINAOR</span>
								<span className={styles.name_text}>( $ _ $ )</span>
							</span>
						</div>
					</span>
				</animated.div>
				<animated.p style={animatedTexts[1]}>
					<Translate description="my introduction">一个立志成为全栈的前端开发工程师</Translate>
				</animated.p>
				<animated.p style={animatedTexts[2]}>
					<Translate
						id="homepage.hero.text"
						description="hero text"
						values={{
							bilibiliText: (
								<Link to="/docs/front">
									<Translate id="hompage.hero.text.bilibili" description="Bilibili docs link label">
										大佬技术视频教程、
									</Translate>
								</Link>
							),
							blogs: (
								<Link to="/blog">
									<Translate id="hompage.hero.text.blog" description="Blog link label">
										大佬技术博客、
									</Translate>
								</Link>
							),
							links: (
								<Link to="/docs/resources">
									<Translate id="hompage.hero.text.link" description="Link link label">
										前端资源导航、
									</Translate>
								</Link>
							),
							ideas: (
								<Link to="/lifestyle">
									<Translate id="hompage.hero.text.idea" description="Idea link label">
										想法和生活点滴
									</Translate>
								</Link>
							)
						}}
					>
						{`点击查看最新{bilibiliText}{blogs}{links}以及本人的{ideas}。之后会慢慢补充自己的学习笔记和博客。`}
					</Translate>
				</animated.p>
				<SocialLinks animatedProps={animatedTexts[3]} />
			</div>
			<HeroMainImage />
		</animated.div>
	)
}

function SocialLinks({ animatedProps, ...props }) {
	return (
		<animated.div className={styles.social__links} style={animatedProps}>
			{/* <a href="https://space.bilibili.com/302954484">
        <BilibiliIcon />
      </a>
      <a href="https://www.linkedin.com/in/zxuqian/">
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </a>
      <a href="https://github.com/zxuqian">
        <FontAwesomeIcon icon={faGithub} size="lg" />
      </a>
      <a href="https://blog.csdn.net/fengqiuzhihua">
        <CSDNIcon />
      </a> */}
			<div className={`dropdown ${styles.dropdown} dropdown--hoverable`}>
				<FontAwesomeIcon icon={faWeixin} size="lg" />
				<img width="50%" className={`dropdown__menu ${styles.dropdown__menu}`} src={useBaseUrl('/img/wechat.jpg')} />
			</div>
		</animated.div>
	)
}

function HeroMainImage() {
	return (
		<div className={styles.bloghome__image}>
			<HeroMain />
		</div>
	)
}

export default Hero
