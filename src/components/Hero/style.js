import styled from 'styled-components'

export const NameWrapper = styled.div`
	position: relative;
	display: inline-block;
	margin: 0;
	.name-up,
	.name-down {
		position: absolute;
		top: 0;
		left: 0;
		white-space: nowrap;
		/* 使文字上下移动时有0.4s的过渡效果 */
		transition: 0.4s;
	}
	.name-up {
		/* 裁剪文字的上半部分 */
		clip-path: inset(1% 0 50% 0);
	}
	.name-down {
		/* 裁剪文字的下半部分，括号里的四个值分别是
            top，right，bottom，left */
		clip-path: inset(49% 0 0 0);
	}

	&:hover .name-up,
	&:hover .name-down {
		/* 让--i为30的向上移动30px，-30的向下移动30px
            这样子就能空出60px留给中间的超链接 */
		top: calc(var(--i) * 1px);
	}
	&:hover .name-text {
		opacity: 1;
		text-shadow: #676666 1px 1px 3px;
	}
	.name-text {
		font-size: 16px;
		text-shadow: #676666 1px 1px 2px;
		color: #eee;
		opacity: 0;
		transition: 0.3s;
	}
	.name-hidden-container {
		position: relative;
		white-space: nowrap;
		.name-hidden {
			visibility: hidden;
		}
		.name-text {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
`
