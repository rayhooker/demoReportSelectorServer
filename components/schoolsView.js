import React from 'react';  
import jQuery from 'jquery';   
import Router from 'next/router';  

import SkyLight from 'react-skylight';

var helpPopup = { 
    width: '90%',
    height: '60%',
    // "verticalAlign": "middle",
    marginLeft: '-45%',
    "borderRadius": '10px',
    "overflow": "scroll"
  };
var _ = require('underscore');
var twbsPagination;

var isMobile = require('ismobilejs');
// var twbsPagination = require('twbs-pagination');
class SchoolsView extends React.Component {

 
    constructor(props){
    super(props);   
    var value = "";  
    var schoolList = [];   
    this.state = {
        "viewSelect": props.viewSelect, 
        "langs": props.langs,
        "types": props.types, 
        "filters": props.filters,
        "viewfilter": "", 
        "suggestions": [],
        "currpage": 1,
        "value": value,
        "district": props.district,
        "perpage": 50,
        "showfilters": false, 
        "initialSiteLoad": props.initialSiteLoad,
        "schoolList": schoolList,
        "sort_order": props.sort_order 

    };
    }

    componentDidMount() {
        var $ = require('jquery'); 
        window.$ = window.jQuery = jQuery; 
        twbsPagination = require('twbs-pagination');
        jQuery.noConflict(true); 
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== this.props.language) {
            var filters = this.state.filters;
            filters.lang = nextProps.language;
            var filterstring = this.filterString(filters);
            var newroute = Router.pathname+"?"+filterstring;
            Router.push(newroute, newroute, { shallow: true }) 

            this.setState({
                filters: filters
            });
        }
    }
 

    setViewSchools() {

        if (this.state.viewSelect === "schools") {
            return;
        } 
        var filters = this.state.filters;
        filters.viewSelect = "schools";
        var filterstring = this.filterString(filters);
        var newroute = Router.pathname+"?"+filterstring;
        Router.push(newroute, newroute, { shallow: true })     
        this.setState({
            value: "",
            viewSelect: "schools",
            filters: filterstring,  
            initialSiteLoad: false, 
            filters: {viewSelect: "schools", year: this.props.years[this.props.years.length - 1], type: "Both", level: "All", district: "All"}
        });
    }

    setViewState() { 

        var filters = this.state.filters;
        var schoolList = [];  
        filters.viewSelect = "state";
        var filterstring = this.filterString(filters);
        var newroute = Router.pathname+"?"+filterstring;
        Router.push(newroute, newroute, { shallow: true })   
        this.setState({
            value: "",
            viewSelect: "state",
            filters: filterstring,  
            filters: {viewSelect: "", year: 2019, type: "Both", level: "All", districts: "All"}
        });
    }

    setViewDistricts() {
        if (this.state.viewSelect === "districts") {
            return;
        } 
        var filters = this.state.filters;
        filters.viewSelect = "districts";
        var filterstring = this.filterString(filters); 
        // return 0;
        var newroute = Router.pathname+"?"+filterstring;
        Router.push(newroute, newroute, { shallow: true })   
        this.setState({ 
            viewSelect: "districts",
            filters: filterstring, 
            filters: {viewSelect: "", year: 2017, type: "Both", level: "All", districts: "All"}
        });
    }
    setViewCounties() {
        if (this.state.viewSelect === "counties") {
            return;
        }    
        var filters = this.state.filters;
        filters.viewSelect = "counties";
        var filterstring = this.filterString(filters);
        var newroute = Router.pathname+"?"+filterstring;
        Router.push(newroute, newroute, { shallow: true })  
        this.setState({
            value: "",
            county: "",
            filter: filterstring,
            viewSelect: "counties", 
            filters: {viewSelect: "", year: 2018, type: "Both", level: "All", districts: "All"}
        });
    } 

    clearInput() { 
        this.setState({
            value: ""
        })
    } 

 
    openCloseFilter (event) { 
        var newstate = true;
        if (this.state.showfilters === true) {
        newstate = false;
        }
        this.setState({showfilters: newstate});
        return;
    }
 
    updateFilter (event) {  
        var newfilter = event.target.previousElementSibling.childNodes[0].value;  
        if (newfilter !== this.state.viewfilter) {

            var filteredReportList = getReportList(this.state.filters, this.props.allReportList, this.state.sort_order, newfilter);
            var totpages = Math.round((filteredReportList.length / 50) + .49); 
            this.updatePageSelector(totpages);
            this.setState({
                viewfilter: newfilter,
                "reportList": filteredReportList,
                "currpage": 1 
            }); 

        }  
    }

    filterString (filters) {
        return Object.keys(filters).map(function(item) { return item + "=" + filters[item] }.bind(this)).join('&');
    }
    
 




    buttonsView (viewSelect) {
        var { value, suggestions } = this.state; 
        
        // Autosuggest will pass through all these props to the input. 
        var viewSelect;  
        switch (this.state.viewSelect) { 
            case "state":
                viewSelect = "State";
                break;
            case "districts":
                viewSelect = "Search by District";
                break;
            case "district":
                viewSelect = "Search by District";
                break;
            case "counties":
                viewSelect = "Search by County";
                break;
            case "county":
                viewSelect = "Search by County";
                break;
            default:
                break;
        }    
        var placeholder = viewSelect === "state" ? "" : viewSelect;
        var inputProps = {
            placeholder: placeholder,
            value: this.state.value,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown
        };
    return <div >
        <div className="row  ">
            <div className="filterbox">
            <div className={this.state.viewSelect === "state" ? "hidden" : "findheader"}>{this.state.viewSelect === "state" ? null : ['Find Your School','Find Your School','Find Your District','Find Your District','Find Your County','Find Your County'][["schools","school","district","districts","counties","county"].indexOf(this.state.viewSelect)]}</div>
            <div className="focusSearch">
                <span className="focus_selector" id="focusselector">
                    <span onClick={this.setViewState.bind(this)} className={this.state.viewSelect === "state" ? "school_selector selector_selected" : "school_selector"}>
                    State
                    </span>
                    <span onClick={this.setViewDistricts.bind(this)} className={["district","districts"].indexOf(this.state.viewSelect) > -1 ? "district_selector selector_selected" : "district_selector"}>
                    Districts 
                    </span>

                    <span onClick={this.setViewCounties.bind(this)} className={["counties","county"].indexOf(this.state.viewSelect) > -1  ? "county_selector selector_selected" : "county_selector"}>
                        Counties  
                    </span>
                </span>
 
 
                </div> 
            </div>
 
            </div>
 
        </div>;



    }

    render () {  

    return  <div>
          {this.buttonsView(this.state.filters.viewSelect)} 
          <div className="row"> 


          </div>

      <br/><br/>  
      <br/><br/><br/>
      
        </div>
    }
}

export default SchoolsView;