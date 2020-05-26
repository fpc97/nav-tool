import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import NavTool from './nav-tool';
import NavToolTransitions from './nav-tool-transitions';

const navLayout = {
    'Who we are': {
        'Go back': 'back',
        'Principles': '/principles',
        'How we work': '/how-we-work',
        'History': '/history'
    },
    'What we do': {
        'Go back': 'back',
        'News & stories': '/news',
        'Countries': '/countries'
    },
    'Careers': {
        'Go back': 'back',
        'Work in the US office': {
            'Go back': 'back',
            'Current job listings': '/job-listings',
            'Office internships': '/internships'
        },
        'Work in the field': {
            'Go back': 'back',
            'Essential requirements': '/requirements',
            'Find a role': '/find-a-role'
        }
    },
    'Support us': {
        'Go back': 'back',
        'Donate online': '/donate?t=online',
        'Mail in donations': '/donate?t=mail'
    },
    'Donate': '/donate'
};

const Index = () => {
  	return (
		<div className="wrapper">
			<section className="navtool-section navtool-section--regular">
				<h2>Normal</h2>
				<NavTool navTree={navLayout} levelClasses/>
			</section>
			<section className="navtool-section navtool-section--transitions">
				<h2>With transitions</h2>
				<NavToolTransitions navTree={navLayout}/>
			</section>
		</div>
	);
};

ReactDOM.render(<Index/>, document.getElementById('root'));