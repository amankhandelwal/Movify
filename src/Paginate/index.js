import React from 'react';
import './Paginate.css';

const Paginate = props => {
	return (
		<div className="pagination">
			<div className="paging">
				<div className="btn prev" onClick={() => props.onNavigate(-1)}>
					Prev
				</div>
				<div className="page">Page: {props.page + 1}</div>
				<div className="btn next" onClick={() => props.onNavigate(1)}>
					Next
				</div>
			</div>
			<div className="paging">
				Results per Page:
				<select
					value={props.rpp}
					onChange={event => props.onSelect('rpp', Number(event.target.value))}
					className="dropdown rpp"
				>
					<option value={'10'}>10</option>
					<option value={'20'}>20</option>
					<option value={'50'}>50</option>
				</select>
			</div>
			<div className="paging sorted">
				Sort By:
				<select
					value={props.sort}
					onChange={event => props.onSelect('sort', event.target.value)}
					className="dropdown sort"
				>
					<option value={''}>None</option>
					<option value={'movie_title'}>Movie Name</option>
					<option value={'rating'}>Rating</option>
					<option value={'title_year'}>Year</option>
				</select>
				<div className="direction" onClick={() => props.toggleDirection()}>
					{props.direction === 1 ? 'Ascending' : 'Descending'}&nbsp;
					<i className={props.direction === 1 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'} />
				</div>
			</div>
		</div>
	);
};

export default Paginate;
