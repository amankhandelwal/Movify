import React from 'react';
import './Filter.css';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	renderFilters = () => {
		const props = this.props;
		const Languages = Object.keys(props.languages);
		const Countries = Object.keys(props.countries);
		return (
			<div className="filters">
				<div className="langauge">
					<h2 className="filter-title">Language</h2>
					<div className="options">
						{Languages.map((item, index) => {
							if (!item) return null;
							return (
								<div key={index} className="checkbox-container">
									<input
										className="checkbox"
										type="checkbox"
										value={item}
										onChange={props.onLanguageChanged}
										checked={props.languages[item]}
									/>
									{item}
								</div>
							);
						})}
					</div>
				</div>
				<div className="country">
					<h2 className="filter-title">Country</h2>
					<div className="options">
						{Countries.map((item, index) => {
							if (!item) return null;
							return (
								<div key={index} className="checkbox-container">
									<input
										className="checkbox"
										type="checkbox"
										value={item}
										checked={props.countries[item]}
										onChange={props.onCountryChanged}
									/>
									{item}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	};
	render() {
		let visible = this.state.visible;
		const filters = this.renderFilters();
		return (
			<div className="filter-container">
				<div
					className={visible ? 'expanded filter-header-container' : 'collapsed filter-header-container'}
					onClick={() => {
						this.setState({
							visible: !visible
						});
					}}
				>
					<h2 className="filter-header">Filters</h2>
					<i className={visible ? 'fas fa-angle-up' : 'fas fa-angle-down'} />
				</div>
				{visible ? filters : null}
			</div>
		);
	}
}
export default Filter;
