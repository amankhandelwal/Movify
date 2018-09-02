import React from 'react';
import './MovieItem.css';

export default class MovieItem extends React.Component {
	render() {
		let item = this.props.item;
		return (
			<div className="movie-item" onClick={() => this.props.onItemSelected(this.props.index)}>
				<div className="item-left">
					<img src={item.poster || ''} alt={'image not available'} className="poster" />
					<h3 className="rating">Rating: {item.rating || ''}/10</h3>
				</div>
				<div className="item-right">
					<h1 className="title">{item.movie_title}</h1>
					<div className="genre">
						{item.genres.split('|').map((item, index) => <GenreItem key={index}>{item}</GenreItem>)}
					</div>
					<p className="year">
						{item.title_year} &nbsp;&nbsp;Language:{item.language}
					</p>
					<p className="actor">
						Starring: {item.actor_1_name} and {item.actor_2_name}
					</p>
					<p className="director">Directed By: {item.director_name}</p>
				</div>
			</div>
		);
	}
}

const GenreItem = props => {
	return <span className="genre-item">{props.children}</span>;
};
