import React from 'react';
import './MovieExpanded.css';

export default class MovieExpanded extends React.Component {
	render() {
		let item = this.props.item;
		return (
			<div className="expanded-movie-item">
				<i
					className="far fa-window-close close-btn"
					onClick={() => {
						this.props.hide();
						// document.querySelector('.expanded-movie-item').style.display = 'none';
					}}
				/>
				<img src={item.poster || ''} alt={'image not available'} className="expanded-poster" />
				<h3 className="expanded-rating">Rating: {item.rating}/10</h3>

				<h1 className="expanded-title">{item.movie_title}</h1>
				<p className="year expanded-year">
					{item.title_year} &nbsp;&nbsp;<strong>Language:</strong> {item.language} &nbsp;&nbsp;<strong>
						Country:
					</strong>{' '}
					{item.country}&nbsp;&nbsp;<GenreItem>{item.content_rating || ''}</GenreItem>
				</p>
				<p className="expanded-summary">{item.summary || ''}</p>
				<div className="expanded-genre">
					{item.genres.split('|').map((item, index) => <GenreItem key={index}>{item}</GenreItem>)}
				</div>
				<p className="actor">
					<strong>Starring:</strong> {item.actor_1_name} and {item.actor_2_name}
				</p>
				<p className="director">
					<strong>Directed By:</strong> {item.director_name}
				</p>
				<p className="year">
					<strong>Plot Keywords:</strong> {item.plot_keywords}
				</p>
				<a className="imdb-link" href={item.movie_imdb_link} target="_blank" rel="noopener noreferrer">
					<h3>
						Checkout on <strong>IMDB</strong>
					</h3>
				</a>
			</div>
		);
	}
}

const GenreItem = props => {
	return <span className="expanded-genre-item">{props.children}</span>;
};

/*{
"content_rating": "PG-13",
"budget": "237000000",
"plot_keywords": "avatar|future|marine|native|paraplegic",
"movie_imdb_link": "http://www.imdb.com/title/tt0499549/?ref_=fn_tt_tt_1"
}*/
