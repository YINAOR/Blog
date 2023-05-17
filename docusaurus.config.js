// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path')

const config = {
	title: 'YINAOR',
	tagline: 'Dinosaurs are cool',
	favicon: 'img/favicon.ico',
	// Set the production url of your site here
	url: 'http://www.yinaor.com',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',
	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'yinaor', // Usually your GitHub org/user name.
	projectName: 'docusaurus', // Usually your repo name.
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en']
	},

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		// announcementBar: {
		// 	id: 'feature_release', // Any value that will identify this message.
		// 	content: `更新<a href='/docs/videos/browser/js-web-animations-api'>《与 CSS Keyframes 媲美的原生 JS 高性能动画 API 教程》配套文本</a>`,
		// 	backgroundColor: '#fafbfc', // Defaults to `#fff`.
		// 	textColor: '#091E42' // Defaults to `#000`.
		// },
		docs: {
			sidebar: {
				hideable: true,
				autoCollapseCategories: true
			}
		},
		colorMode: {
			defaultMode: 'light',
			disableSwitch: false,
			respectPrefersColorScheme: true
		},
		navbar: {
			// title: '悟空',
			// hideOnScroll: true,
			logo: {
				alt: 'My Site Logo',
				src: 'img/avatar.jpg'
			},
			items: [
				{
					to: '/',
					label: '首页',
					position: 'right'
				},
				{
					to: 'lifestyle',
					label: '随笔',
					position: 'right'
				},
				{
					to: 'blog',
					label: '博客',
					position: 'right'
				},
				{
					label: '学习',
					position: 'right',
					activeBasePath: 'docs',
					items: [
						{
							label: '技术视频',
							to: 'docs/videos/'
						},
						{
							label: 'CSS 完全指南',
							to: 'docs/css/css-tutorial-intro'
						},
						{
							label: '资源导航',
							to: 'docs/resources/'
						}
					]
				},
				{
					label: '小工具',
					position: 'right',
					to: 'docs/tools/'
				}
				// {
				// 	href: 'https://github.com/facebook/docusaurus',
				// 	label: 'GitHub',
				// 	position: 'right'
				// }
			]
		},
		// algolia: {
		// 	apiKey: 'fabfb0e9997e101154ed85d64b7b6a3c',
		// 	indexName: 'ZXUQIANCN',
		// 	appId: 'LIJMO3C9C4'
		// },
		footer: {
			style: 'dark',
			// logo: {
			// 	alt: 'Meta 开源图标',
			// 	src: 'img/avatar.jpg',
			// 	width: 160,
			// 	height: 51
			// },
			// copyright: `<p>Copyright © ${new Date().getFullYear()} YINAOR Built with Docusaurus.</p><a href="http://beian.miit.gov.cn/" >粤ICP备20037995号-1</a>`
			copyright: `<a href="http://beian.miit.gov.cn/" >粤ICP备20037995号-1</a>`
		},
		prism: {
			theme: require('prism-react-renderer/themes/github'),
			darkTheme: require('prism-react-renderer/themes/oceanicNext'),
			defaultLanguage: 'javascript'
		}
	},

	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
					remarkPlugins: [import('remark-math')],
					rehypePlugins: [import('rehype-katex')],
					showLastUpdateTime: true
				},
				blog: {
					showReadingTime: false,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
					path: './blog',
					// routeBasePath: '/',
					// blogSidebarTitle: '近期文章',
					postsPerPage: 16,
					blogTitle: '博客',
					blogDescription: '这个是 YINAOR 用 Docusaurus 搭建的博客！',
					remarkPlugins: [import('remark-math')],
					rehypePlugins: [import('rehype-katex')]
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css')
				},
				sitemap: {
					changefreq: 'daily',
					priority: 0.5
				}
			}
		]
	],

	plugins: [
		// path.resolve(__dirname, './src/plugin/plugin-baidu-analytics'),
		// path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
		// path.resolve(__dirname, './src/plugin/plugin-onesignal-push'),
		// path.resolve(__dirname, './src/plugin/plugin-latest-docs'),
		'docusaurus2-dotenv',
		[
			'@docusaurus/plugin-content-blog',
			{
				id: 'secret-garden',
				routeBasePath: 'lifestyle',
				path: './lifestyle',
				postsPerPage: 'ALL'
			}
		]
	],

	stylesheets: [
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com',
			type: 'text/css'
		},
		{
			href: '/katex/katex.min.css',
			type: 'text/css',
			integrity: 'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
			crossorigin: 'anonymous'
		},
		{
			href: 'https://fonts.font.im/css?family=Raleway:500,700&display=swap',
			type: 'text/css',
			rel: 'stylesheet'
		}
	]
}

module.exports = config
