import React from 'react';
import ReactDOM from 'react-dom';
// import NcMap from '../static/images/nc-map-grey-with-text.svg'; 
// import NcMap from '../static/images/nc_map.svg';
// import Image1 from 'react-svg-loader!../static/images/nc_map.svg';
import Head from 'next/head';
import Link from 'next/link'; 
import jQuery from 'jquery';
import Router from 'next/router'; 
import SchoolsView from '../components/schoolsView'; 
// import languages from '../static/js/languages.json';
import SkyLight from 'react-skylight';
// import styles from '../static/styles/reportselector.css' 
import {Loader} from 'react-loaders'; 
var helpPopup = { 
    width: '80%',
    "vertical-align": "middle",
    marginLeft: '-40%',
    "border-radius": '10px',
    "overflow-y": "scroll"
  };   
var mapStyle = {
    height: "100%"
};
var isMobile = require('ismobilejs');
class InitialPage extends React.Component {

 
  constructor(props){
    super(props);  
    
    this.state = {
        "loader": true,
        "years": props.years,
        "year": props.year,
        "langs": props.langs, 
        "filters": props.filters,
        "viewfilter": "", 
        "viewSelect": props.viewSelect,
        "currpage": 1,
        "viewSelect": props.viewSelect, 
        "perpage": 50,
        "showfilters": false,
        "initialSiteLoad": props.initialSiteLoad 

    };
  }

    static async getInitialProps (req) { 
        const { db } = req;

        var params = req.query;  
        var county = params.county !== undefined ? params.county : "";
        var viewSelect = params.county !== undefined ? viewSelect = "counties" : viewSelect = "state";
  
        var Years = [2015,2016,2017];   
        var Filters = { viewSelect: 'state',
        year: '2017',
        type: 'Both',
        level: 'All',
        district: 'All',
        lang: 'english' };         
        if (params.year !== undefined) { 
            var year = params.year;
            Filters.year = year;
        }
        var initialSiteLoad = true;
        if (Object.keys(params).length > 0) {
            initialSiteLoad = false;
        } 
        var lang = "english";
        if (params.lang !== undefined) {
            lang = params.lang.trim().toLowerCase();
            Filters.lang = lang;
        }
              
        if (params.type !== undefined) { 
            var type = params.type;
            Filters.type = type;
        }
 
 
        if (params.viewSelect !== undefined) { 
            var viewSelect= params.viewSelect;
            Filters.viewSelect = params.viewSelect;
        }  
        if (URL_PREFIX === undefined) {
            var urlprefix = 'src';
        } else {
            var urlprefix = URL_PREFIX !== "" ? "/"+ URL_PREFIX : "";
        }
        return {
            "years": Years, 
            "year": year,  
            "lang": lang,    
            "filters": Filters,
            "viewfilter": "",
            "currpage": 1,
            "district": Filters.district,
            "county": county,
            "perpage": 50,
            "viewSelect": viewSelect,
            "showfilters": false,
            "initialSiteLoad": initialSiteLoad, 
            "urlprefix": urlprefix 
        }
    }

    componentDidMount() { 
        this.setState({"loader": false}); 
        if (this.state.viewSelect === "counties") {
            const schoolsview = ReactDOM.findDOMNode(this.refs.schoolsview); 
            window.scrollTo(0,schoolsview.offsetTop);

        }
    }

    componentDidUpdate() {  
        if (this.state.viewSelect === "counties") {
            const schoolsview = ReactDOM.findDOMNode(this.refs.schoolsview); 
            window.scrollTo(0,schoolsview.offsetTop);

        }
    }

    setSpinnerOn () {
        this.setState({loader: true});
    }
 
    filterString (filters) {
        return Object.keys(filters).map(function(item) { return item + "=" + filters[item] }.bind(this)).join('&');
    } 

    selectEnglish() {
        if (this.state.language !== 'english') {
            var filters = this.state.filters;
            filters.lang = "english";
            var filterstring = this.filterString(filters);
            var newroute = Router.pathname+"?"+filterstring;
            Router.push(newroute, newroute, { shallow: true });
            this.setState({
                language: "english",
                filters: filters
            });
        }
    }
    selectSpanish() {
        if (this.state.language !== 'spanish') {
            var filters = this.state.filters;
            filters.lang = "english";
            var filterstring = this.filterString(filters);
            var newroute = Router.pathname+"?"+filterstring;
            Router.push(newroute, newroute, { shallow: true });
            this.setState({
                language: "spanish",
                filters: filters
            });
        }
    }
 
    render () { 
    return <div>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <title>Demo Report Selector</title> 
        <link rel="stylesheet" href={this.props.urlprefix+"/static/css/loaders.css"}></link>
        <link rel="stylesheet" href={this.props.urlprefix+"/static/css/reportselector.css"}></link>
        <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:700' rel='stylesheet' type='text/css'></link>
        <link href='https://fonts.googleapis.com/css?family=Roboto:100' rel='stylesheet' type='text/css'></link>
        <link href="https://fonts.googleapis.com/css?family=Karla:400,400i" rel="stylesheet"></link>
        <script src="//cdn.iframe.ly/embed.js" async></script>
        </Head>   
        <div className="bodydiv" id="reportselector">
             
 

 
        <div className="reportselector">
          <div className="description">    
              <div className="textintro">
                 <h1>SchoolsView</h1>  
              </div>
            </div>  
            <div id="loader_div" className={this.state.loader === true ? 'hidden': 'hidden'} >
              <Loader type="ball-spin-fade-loader" active size="md" />
            </div>
          <SchoolsView ref="schoolsview"  
            viewSelect={this.state.viewSelect} 
            filters={this.props.filters}   
            urlprefix={this.props.urlprefix}
            sort_order={this.props.sort_order} 
            schoolList={this.props.schoolList}
            initialSiteLoad={this.props.initialSiteLoad} 
            setSpinnerOn={this.setSpinnerOn}
            router= {Router}
            isMobile= {isMobile}
           />
          </div>

        </div> 
 
    </div>
    }
}

export default InitialPage;