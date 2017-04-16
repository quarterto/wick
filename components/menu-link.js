import {Component} from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import {teal, grey} from '@quarterto/colours';
import textRule, {ruleColor} from './text-rule';
import {sansScale} from './type-scale';
import {transparentize} from 'polished';
import {Heading} from './typography';
import colour from './colour';

const transparentWhite = transparentize(0.8, '#fff');
const transparentBlack = transparentize(0.8, '#000');

const Anchor = styled.a`
padding: 0 1rem;
line-height: 3rem;
display: inline-block;
text-decoration: none;
color: ${grey[0]};

${({primary}) => primary && colour('blue')}
${({danger}) => danger && colour('red')}

order: ${({right}) => right ? 2 : 0};

&:hover {
	background-image: linear-gradient(to bottom, ${transparentWhite} 0%, ${transparentWhite} 100%);
}

&:active {
	background-image: linear-gradient(to bottom, ${transparentBlack} 0%, ${transparentBlack} 100%);
}
`;

const Shim = styled.span`
display: block;
${sansScale(0)}
`;

export const MenuItem = ({logo, children, ...props}) => <Anchor href='#' {...props}>
	{logo ?
		<Heading level={6} anchor={false}>{children}</Heading>
		: <Shim>{children}</Shim>}
</Anchor>;

export default class MenuLink extends Component {
	state = {};

	componentDidMount() {
		if(this.link) {
			const {href, as} = this.link;
			this.setState({href, as});
		}
	}

	render() {
		const {href, as, ...props} = this.props;
		return <NextLink {...{href, as}} ref={link => this.link = link}>
			<MenuItem href={this.state.as || this.state.href} {...props} />
		</NextLink>;
	}
};
