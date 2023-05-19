/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react'
import { BlogPostProvider, useBlogPost } from '@docusaurus/theme-common/internal'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import BlogPostItem from '@theme/BlogPostItem'
import BlogPostItemSimple from '../../components/BlogPostItemSimple'
import TypedComponent from '../../components/Typed'
import BlogListPaginator from '@theme/BlogListPaginator'
import ScrollTexts from '../../components/ScrollTexts'

// import Fade from "react-reveal/Fade";

import Translate from '@docusaurus/Translate'
import Head from '@docusaurus/Head'

import ListFilter from './img/list.svg'
import CardFilter from './img/card.svg'

import Link from '@docusaurus/Link'
import { useViewType } from './useViewType'

import Hero from '@site/src/components/Hero'

function BlogListPage(props) {
	const { metadata, items } = props
	const {
		siteConfig: { title: siteTitle }
	} = useDocusaurusContext()
	const isBlogOnlyMode = metadata.permalink === '/'
	const isPaginated = metadata.page > 1

	// list or card view
	const { viewType, toggleViewType } = useViewType()

	const isCardView = viewType === 'card'
	const isListView = viewType === 'list'

	let title = metadata.blogTitle
	let suffix = ` | ${siteTitle}`

	let isLifestyle = false
	let description = `html, css, javascript, react, vue 前端教程，以及 B站视频教程合集和配套文本、系统教程、编程博客和前端资源导航。致力于帮助你以最直观、最快速的方式学会前端开发。`
	if (metadata.permalink.startsWith('/lifestyle')) {
		isLifestyle = true
		title = '随笔'
		description = '一个前端的生活方式、思想感悟、学习经验等'
	}

	const CardFilterDiv = () => {
		return !isLifestyle ? (
			<div className="bloghome__swith-view">
				<CardFilter onClick={() => toggleViewType('card')} className={viewType === 'card' ? 'bloghome__switch--selected' : 'bloghome__switch'} />
				<ListFilter onClick={() => toggleViewType('list')} className={viewType === 'list' ? 'bloghome__switch--selected' : 'bloghome__switch'} />
			</div>
		) : (
			<div style={{ height: '31.9px', margin: '2em 0 1em 0' }}></div>
		)
	}

	return (
		<Layout title={title} description={description} wrapperClassName="blog-list__page">
			<Head>
				<meta name="keywords" content="前端, html, css, js, javascript, react, vue, typescript, es6, html5, css3, 性能优化, 兼容性调整" />
				<title>{title + suffix}</title>
			</Head>
			{!isPaginated && isBlogOnlyMode && <Hero />}
			<div className="container-wrapper">
				<div className="container padding-vert--sm">
					<div className="row">
						<div className="col col--12">
							{/* <div className="content__divider"></div> */}
							{!isPaginated && (
								<h1 className="blog__section_title" id="homepage_blogs">
									<TypedComponent />
								</h1>
							)}

							{/* switch list and card */}
							<CardFilterDiv></CardFilterDiv>
							<div className="bloghome__posts">
								{/* 随笔 */}
								{isLifestyle && (
									<div className="bloghome__posts-card">
										{items.map(({ content: BlogPostContent }, index) => (
											<BlogPostItemSimple
												key={BlogPostContent.metadata.permalink}
												frontMatter={BlogPostContent.frontMatter}
												metadata={BlogPostContent.metadata}
												truncated={BlogPostContent.metadata.truncated}
											>
												<BlogPostContent />
											</BlogPostItemSimple>
										))}
									</div>
								)}
								{/* 博客 */}
								{!isLifestyle && (
									<ScrollTexts
										items={[
											{
												text: 'Html JavaScript Css TypeScript Http Node Webpack Vite Mongo Git Npm ',
												repeatNum: 2
											},
											{
												text: 'Code & Input & Output & ',
												isltr: true
											},
											{
												text: 'Vue React UniApp Express Koa ElementUI AntDesign Vant IView ',
												repeatNum: 2
											}
										]}
									/>
								)}
								{!isLifestyle && isCardView && (
									<div className="bloghome__posts-card">
										{items.map(({ content: BlogPostContent }, index) => (
											<BlogPostProvider content={BlogPostContent}>
												<BlogPostItem
													key={BlogPostContent.metadata.permalink}
													frontMatter={BlogPostContent.frontMatter}
													metadata={BlogPostContent.metadata}
													truncated
												>
													<BlogPostContent />
												</BlogPostItem>
											</BlogPostProvider>
										))}
									</div>
								)}
								{!isLifestyle && isListView && (
									<div className="bloghome__posts-list">
										{items.map(({ content: BlogPostContent }, index) => {
											const { metadata: blogMetaData, frontMatter } = BlogPostContent
											const { title } = frontMatter
											const { permalink, date, tags } = blogMetaData

											const dateObj = new Date(date)

											const year = dateObj.getFullYear()
											let month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
											const day = ('0' + dateObj.getDate()).slice(-2)

											return (
												<div className="post__list-item" key={blogMetaData.permalink}>
													<Link to={permalink} className="post__list-title">
														{title}
													</Link>
													<div className="post__list-tags">
														{tags.length > 0 &&
															tags.slice(0, 2).map(({ label, permalink: tagPermalink }, index) => (
																<Link
																	key={tagPermalink}
																	className={`post__tags ${index < tags.length ? 'margin-right--sm' : ''}`}
																	to={tagPermalink}
																	style={{
																		fontSize: '0.75em',
																		fontWeight: 500
																	}}
																>
																	{label}
																</Link>
															))}
													</div>
													<div className="post__list-date">
														{year}-{month}-{day}
													</div>
												</div>
											)
										})}
									</div>
								)}
								{/* 分页 */}
								<BlogListPaginator metadata={metadata} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default BlogListPage
