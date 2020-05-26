import React, { Component } from 'react';

export default class NavTool extends Component {
    state = {
        navigationChain: []
    }

    constructor(props) {
        super(props);
        
        const prefix = props.prefix || 'ntl';
        const levelClasses = props.levelClasses || false;

        this.state = {
            prefix,
            levelClasses,
            navigationChain: []
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
                return <a className={this.state.prefix + '-link'} href={it[1]}>{it[0]}</a>;
                // In case you're using Routes
                // return <Link to={it[1]}>
            }
        });

        return parsedList.map((a, i) => <li key={i} className={this.state.levelClasses ? this.composeLevelClass('li') : null}>{a}</li>);
    }

    generateSection = () => {
        const currentList = this.getList();
        const parsedList = this.parseList(currentList);
        return parsedList;
    }

    render() {
        return (
            <nav>
                <ul className={this.state.levelClasses ? this.composeLevelClass('ul') : null}>
                    {this.generateSection()}
                </ul>
            </nav>
        );
    }
}