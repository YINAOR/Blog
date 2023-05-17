/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { MDXProvider } from '@mdx-js/react'

import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import MDXComponents from '@theme/MDXComponents'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// import ThemeContext from "@theme/ThemeContext";

import { MarkdownSection, StyledBlogItem, DateWrapper } from './style'
import styles from './styles.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

const MONTHS = ['', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function BlogPostItem(props) {
	const { children, frontMatter, metadata, isBlogPostPage = false } = props

	const { date, permalink, tags, readingTime } = metadata

	const { title, image } = frontMatter

	const imageUrl = useBaseUrl(image, { absolute: true })

	// 是否为黑暗主题：
	// const theme = useContext(ThemeContext);
	const isDarkTheme = true

	// 当前语言
	const {
		i18n: { currentLocale }
	} = useDocusaurusContext()

	const dateObj = new Date(date)

	const year = dateObj.getFullYear()
	let month = dateObj.getMonth() + 1
	const day = dateObj.getDate()

	let dateStr = `${year}年${month}月`

	if (currentLocale === 'en') {
		month = dateObj.toLocaleString('default', { month: 'long' })
		dateStr = `${month}, ${year}`
	}

	const renderPostHeader = () => {
		return (
			<header>
				<h2 className={clsx('margin-vert--md', styles.blogPostTitle)}>{title}</h2>
			</header>
		)
	}

	return (
		<StyledBlogItem isDark={isDarkTheme} isBlogPostPage={isBlogPostPage}>
			<Head>
				{image && <meta property="og:image" content={imageUrl} />}
				{image && <meta property="twitter:image" content={imageUrl} />}
				{image && <meta name="twitter:image:alt" content={`Image for ${title}`} />}
			</Head>

			<div className="blog-list--item" style={{ margin: 0 }}>
				{/* 列表页日期 */}
				<DateWrapper className="margin-bottom--lg">
					<div className="post__day">{day}</div>
					<div className="post__year_month">{dateStr}</div>
					<div className="line__decor"></div>
				</DateWrapper>
				<div>
					{/* 博文部分 */}
					<article className="margin-bottom--md">
						{/* 标题 */}
						{title && renderPostHeader()}
						{/* 正文 */}
						<MarkdownSection isBlogPostPage={isBlogPostPage} isDark={isDarkTheme} className="markdown">
							<MDXProvider components={MDXComponents}>{children}</MDXProvider>
						</MarkdownSection>
					</article>
				</div>
			</div>
		</StyledBlogItem>
	)
}

export default BlogPostItem
