import React, { Component } from 'react';
import './App.css';
import MovieList from './MovieList';
import Loading from './Loading';
import Paginate from './Paginate';
import Filter from './Filter';
import Header from './Header';
import myData from './imdbData';
import MovieExpanded from './MovieExpanded';
// import Movie from './MovieItem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: [],
      languages: [],
      countries: [],
      page: 0,
      rpp: 10,
      search: '',
      sort: '',
      direction: 1,
      selected: -1
    };
    this.dataLength = 0;
    this.onNavigate = this.onNavigate.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    /*'https://billsplit-3e936.firebaseapp.com/API/data.json' 'http://starlord.hackerearth.com/movieslisting'*/
    fetch('https://cors-anywhere.herokuapp.com/https://coffee-shop-d6741.firebaseapp.com/API/data.json')
      .then(res => res.json())
      .then(data => {
        // Extract Language List and Country List
        var languages = {};
        var countries = {};
        // Add Images + Rating + Summary
        data = data.map(item => {
          languages[item.language] = 1;
          countries[item.country] = 1;
          item['poster'] = myData[item.movie_imdb_link].poster;
          item['rating'] = myData[item.movie_imdb_link].rating;
          item['summary'] = myData[item.movie_imdb_link].summary;
          return item;
        });
        this.setState({
          data,
          languages,
          countries,
          loading: false
        });
      });
  }

  onNavigate = amt => {
    const rpp = this.state.rpp;
    let page = this.state.page + amt;
    page = page > 0 ? page : 0;
    page = page * rpp < this.dataLength ? page : this.state.page;
    this.setState({ page });
  };

  onSelect = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSearch = event => {
    const search = event.target.value;
    this.setState({ search });
    this.onItemSelected(-1);
  };

  toggleDirection = () => {
    this.setState({
      direction: this.state.direction * -1
    });
    console.log(this.state.direction);
  };

  onLanguageChanged = event => {
    console.log('lang');
    let languages = this.state.languages;
    languages[event.target.value] = event.target.checked;
    this.setState({ languages });
  };
  onCountryChanged = event => {
    console.log('count');
    let countries = this.state.countries;
    countries[event.target.value] = event.target.checked;
    this.setState({ countries });
  };
  onItemSelected = selected => {
    console.log('selected', selected);
    this.setState({ selected });
    const movieLeft = document.querySelector('.movie-list-container').style;
    const movieContainer = document.querySelector('.movie-list-holder').style;
    if (selected >= 0) {
      movieContainer.maxHeight = '200vh';
      movieLeft.overflowY = 'scroll';
      if (window.innerWidth < 600) {
        movieLeft.display = 'none';
        movieContainer.removeProperty('max-height');
      }
    } else {
      movieContainer.removeProperty('max-height');
      movieLeft.removeProperty('overflow-y');
      if (window.innerWidth < 600) {
        movieLeft.display = 'flex';
        movieLeft.flexDirection = 'column';
      }
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="App">
          <Header search={this.state.search} handleSearch={this.handleSearch} />
          <Loading />
        </div>
      );
    }
    const data = this.state.data;
    //search + Filter
    const filteredData = data.filter(
      item =>
        `${item.movie_title} ${item.genres}`.toUpperCase().indexOf(this.state.search.toUpperCase()) >= 0 &&
        this.state.languages[item.language] &&
        this.state.countries[item.country]
    );
    this.dataLength = filteredData.length;
    const order = this.state.sort;
    //pagination
    const page = this.state.page;
    const rpp = this.state.rpp;
    const start = page * rpp;
    const end = start + rpp;
    //Sort
    const sortedData = filteredData.sort((a, b) => {
      const direction = this.state.direction;
      return a[order] > b[order] ? direction : b[order] > a[order] ? -direction : 0;
    });
    const pageData = sortedData.slice(start, end);
    const Pagination = (
      <Paginate
        onSort={this.onSort}
        onNavigate={this.onNavigate}
        onSelect={this.onSelect}
        page={page}
        rpp={rpp}
        sort={this.state.sort}
        direction={this.state.direction}
        toggleDirection={this.toggleDirection}
      />
    );
    return (
      <div className="App">
        <Header search={this.state.search} handleSearch={this.handleSearch} />
        {Pagination}
        <Filter
          languages={this.state.languages}
          countries={this.state.countries}
          onLanguageChanged={this.onLanguageChanged}
          onCountryChanged={this.onCountryChanged}
        />
        <div className="movie-list-holder">
          <MovieList onItemSelected={this.onItemSelected} data={pageData} />
          {this.state.selected >= 0 ? (
            <MovieExpanded hide={() => this.onItemSelected(-1)} item={pageData[this.state.selected]} />
          ) : null}
        </div>
        {this.dataLength > rpp ? Pagination : null}
      </div>
    );
  }
}

export default App;
