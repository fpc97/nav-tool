import React, { Component } from 'react';

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

export default class NavTool extends Component {
    state = {
        prefix: 'ntl',
        navigationChain: [],

        levelClasses: true
    }

    getList = () => {
        const chain = this.state.navigationChain;
        switch (chain.length) {
            case 0:
                return navLayout;
            case 1:
                return navLayout[chain];
            default:
                return chain.reduce((a, b) => (
                    typeof a === 'string' ?
                    navLayout[a][b]
                    : a[b])
                );
        }
    }

    popList = () => {
        const newChain = this.state.navigationChain;
        newChain.pop();
        this.setState({
            navigationChain: newChain
        });
    }

    pushList = e => {
        this.setState({
            navigationChain: this.state.navigationChain.push(e.target.value)
        });
    }

    changeList = e => {
        const newChain = this.state.navigationChain;
        const pop = e.target.classList.contains((this.state.prefix + '-back'));
        newChain[pop ? 'pop' : 'push'](e.target.textContent);
        this.setState({navigationChain: newChain});
    }

    composeLevelClass = elementType => `${this.state.prefix}-${elementType}-level-${this.state.navigationChain.length}`;

    parseList = list => {
        const arrList = Object.entries(list);

        const parsedList = arrList.map(it => {
            if (it[1] === 'back' || typeof it[1] === 'object') {
                return <span 
                    style={{cursor: 'pointer'}}
                    onClick={this.changeList}
                    className={this.state.prefix + (it[1] === 'back' ? '-back' : '-push')}
                >{it[0]}</span>;
            } else {
                // Here you'll want to switch to Routes
                return <a className={this.state.prefix + '-link'} href={it[1]}>{it[0]}</a>;
            }
        });

        return parsedList.map((a, i) => <li key={i} className={this.state.levelClasses ? this.composeLevelClass('li') : ''}>{a}</li>);
    }

    generateSection = () => {
        const currentList = this.getList();
        const parsedList = this.parseList(currentList);
        return parsedList;
    }

    render() {
        return (
            <nav>
                <ul className={this.state.levelClasses ? this.composeLevelClass('ul') : ''}>
                    {this.generateSection()}
                </ul>
            </nav>
        );
    }
}