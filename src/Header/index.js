import React from 'react';
import './Header.css';

export default class Header extends React.Component {
	render() {
		return (
			<div className="App-header">
				<a className="App-logo-link" href="/">
					<h1 className="App-title">Movify</h1>
				</a>
				<input
					type="text"
					value={this.props.search}
					className="search"
					placeholder="Search for Movies by Title /Genre"
					onChange={this.props.handleSearch}
				/>
			</div>
		);
	}
}
