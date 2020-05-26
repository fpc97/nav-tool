import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import NavTool from './nav-tool';
import NavToolTransitions from './nav-tool-transitions';

const navLayout = {
    'Who we are': {
        'Go back': 'back',
        'Principles': 'www.google.com',
        'How we work': 'www.google.com',
        'History': 'www.google.com'
    },
    'What we do': {
        'Go back': 'back',
        'News & stories': 'www.google.com',
        'Countries': 'www.google.com'
    },
    'Careers': {
        'Go back': 'back',
        'Work in the US office': {
            'Go back': 'back',
            'Current job listings': 'www.google.com',
            'Office internships': 'www.google.com'
        },
        'Work in the field': {
            'Go back': 'back',
            'Essential requirements': 'www.google.com',
            'Find a role': 'www.google.com'
        }
    },
    'Support us': {
        'Go back': 'back',
        'Donate online': 'www.google.com',
        'Mail in donations': 'www.google.com'
    },
    'Donate': 'http://www.google.com'
};

const Index = () => {
  	return (
		<div>
			<section className="navtool-section navtool-section--regular">
				<h1>Nav tool</h1>
				<NavTool navTree={navLayout} levelClasses/>
			</section>
			<section className="navtool-section navtool-section--transitions">
				<h1>Nav tool with transitions</h1>
				<NavToolTransitions navTree={navLayout}/>
			</section>
		</div>
	);
};

ReactDOM.render(<Index/>, document.getElementById('root'));