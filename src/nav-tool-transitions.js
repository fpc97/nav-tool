import React, { Component } from 'react';

export default class NavToolTransitions extends Component {
    state = {
        navigationChain: []
    }

    constructor(props) {
        super(props);
        
        const prefix = props.prefix || 'ntl';
        const levelClasses = props.levelClasses || false;

        const matchTransitionDuration   = props.matchTransitionDuration     || false;
        const transitionTimeExiting     = props.timeExit    || props.time   || 1000;
        const transitionTimeEntering    = props.timeEnter   || props.time   || 1000;

        this.state = {
            prefix,
            levelClasses,
            navigationChain: [],

            transitionTimeEntering,
            transitionTimeExiting,
            matchTransitionDuration,
            currentTransitionState: 'entered'
        };
    }

    getList = () => {
        const chain = this.state.navigationChain;
        switch (chain.length) {
            case 0:
                return this.props.navTree;
            case 1:
                return this.props.navTree[chain];
            default:
                return chain.reduce((a, b) => (
                    typeof a === 'string' ?
                    this.props.navTree[a][b]
                    : a[b])
                );
        }
    }

    changeList = e => {
        if (this.state.currentTransitionState.match(/(exiting|entering)/)) return;

        const target = e.target;

        this.setState({currentTransitionState: 'exiting'});

        setTimeout(() => {
            const newChain = this.state.navigationChain;
            const pop = target.classList.contains((this.state.prefix + '-back'));
            newChain[pop ? 'pop' : 'push'](target.textContent);
            this.setState({navigationChain: newChain, currentTransitionState: 'entering'});

            setTimeout(() => this.setState({currentTransitionState: 'entered'}), this.state.transitionTimeEntering);

        }, this.state.transitionTimeExiting);
    }

    composeLevelClass = elementType => `${this.state.prefix}-${elementType}-level-${this.state.navigationChain.length}`;

    composeTransitionClass = elementType => `${this.state.prefix}-transition-${this.state.currentTransitionState}`;

    getTransitionTime = () => {
        const action = this.state.currentTransitionState === 'entering' ? 'transitionTimeEntering' : 'transitionTimeExiting';
        const timing = this.state[action];
        return `${timing/1000}s`;
    };

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
                return <a className={this.state.prefix + '-link'} href={it[1]}>{it[0]}</a>;
                // In case you're using Routes
                // return <Link to={it[1]}>
            }
        });

        const liClass = `${this.state.levelClasses ? (this.composeLevelClass('li') + ' ') : ''}${this.composeTransitionClass('li')}`

        return parsedList.map((a, i) => <li style={{transitionDuration: this.state.matchTransitionDuration ? this.getTransitionTime() : ''}} key={i} className={liClass}>{a}</li>);
    }

    generateSection = () => {
        const currentList = this.getList();
        const parsedList = this.parseList(currentList);
        return parsedList;
    }

    render() {
        const ulClass = `${this.state.levelClasses ? (this.composeLevelClass('ul') + ' ') : ''}${this.composeTransitionClass('ul')}`;

        return (
            <nav className={this.state.prefix}>
                <ul className={ulClass}>
                    {this.generateSection()}
                </ul>
            </nav>
        );
    }
}