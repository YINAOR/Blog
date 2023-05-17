import React from 'react'
import Typed from 'typed.js'

import styled from 'styled-components'

import { isMobile } from '../../../scripts/utils'

const sentences = [
	'失去灯火后不必惊慌 ^250<br/> 你还可以看见满天繁星',
	'在失去 ^250 在接受中成长',
	'火车的轨道 ^250<br/> 永远不会有轮船驶过',
	'人生若只如初见 ^250<br/> 何事秋风悲化扇',
	'我会和她白头到老 ^250<br/> 只是天各一方',
	'理想与现实的鸿沟间 ^250<br/> 是我短暂的一生'
]

const getSentence = arr => {
	const len = arr.length
	const index = Math.floor(Math.random() * len)
	if (index === len) index = index - 1
	return isMobile() ? arr[index].replace(/<br\/>/g, '\n') : arr[index].replace(/<br\/>/g, '')
}

const TypedWrapper = styled.div``

export default function TypedComponent({ cursorChar = '_' }) {
	// Create reference to store the DOM element containing the animation
	const el = React.useRef(null)

	React.useEffect(() => {
		const typed = new Typed(el.current, {
			strings: [getSentence(sentences)],
			typeSpeed: 80,
			cursorChar,
			shuffle: true
		})

		return () => {
			// Destroy Typed instance during cleanup to stop animation
			typed.destroy()
		}
	}, [])

	return (
		<TypedWrapper>
			<span style={{ whiteSpace: 'pre', lineHeight: '1.5em' }} ref={el} />
		</TypedWrapper>
	)
}