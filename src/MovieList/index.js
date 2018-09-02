import React from 'react';
import './MovieList.css';
import Movie from '../MovieItem';

export default class MovieList extends React.Component {
	render() {
		let data = this.props.data;
		if (!data) return null;
		data = data.map((item, index) => (
			<Movie onItemSelected={this.props.onItemSelected} key={index} index={index} item={item} />
		));
		return <div className="movie-list-container">{data}</div>;
	}
}
