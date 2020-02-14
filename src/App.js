import React from 'react';
import './App.css';
import ReactPaginate from 'react-paginate';
import Preloader from "./common/Preloader/Preloader";
import Table from "./components/Table/Table";
import _ from "lodash";
import DetailRowView from "./components/Table/DetailRowView/DetailRowView";
import ModeSelector from "./components/ModeSelector/ModeSelector";
import TableSearch from "./components/TableSearch/TableSearch";

class App extends React.Component {

    state = {
        isModeSelected: false,
        isLoading: false,
        data: [],
        sort: "ask", // desc
        sortField: "id",
        row: null,
        search: "",
        currentPage: 0,
        show: false,
        value: ""
    }

    async fetchData (url) {
        const response = await fetch(url)
        const data = await response.json();
        this.setState({
            isLoading: false,
            data: _.orderBy(data, this.state.sortField, this.state.sort)
        })
    }

    onSort = sortField => {
        const clonedData = this.state.data.concat();
        const sort = this.state.sort === "ask" ? "desc" : "ask";

        const data = _.orderBy(clonedData, sortField, sort );

        this.setState({
            data,
            sort,
            sortField
        })
    }

    onRowSelect = row => {
        this.setState({
            row
        })
    }

    onSelect = url => {
        this.setState({
            isModeSelected: true,
            isLoading: true
        })

        this.fetchData(url)
    }

    pageChangeHandler = ({selected}) => {
        this.setState({
            currentPage: selected
        })
    }

    searchHandler = search => {
       this.setState({search, currentPage: 0})
    }

    getFilteredData () {
        const {data, search } =  this.state

        if(!search) {
            return data
        }

        return data.filter(item => {
            return item["firstName"].toLowerCase().includes(search.toLowerCase())
                || item["lastName"].toLowerCase().includes(search.toLowerCase())
                || item["email"].toLowerCase().includes(search.toLowerCase())
        })
    }

    handleClick = () => {
        this.setState({
            show: true
        })
    }

    render () {

        const pageSize = 50;

        if(!this.state.isModeSelected) {
            return (
                <div className="container">
                    <ModeSelector  onSelect={this.onSelect} />
                </div>
            )
        }

        const filteredData = this.getFilteredData()

        const pageCount = Math.ceil(filteredData.length/pageSize)

        const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]

        return (
            <div className="app">
                {
                    this.state.isLoading
                        ? <Preloader />
                        : <React.Fragment>
                            <TableSearch onSearch={this.searchHandler} />
                            <Table data={displayData}
                                   onSort={this.onSort}
                                   onRowSelect={this.onRowSelect}
                                   sort={this.state.sort}
                                   sortField={this.state.sortField} />
                        </React.Fragment>
                }

                {
                    this.state.data.length > pageSize
                    ? <ReactPaginate
                            previousLabel={'prev'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            forcePage={this.state.currentPage}
                        />
                    : null
                }

                {
                    this.state.row
                    ? <DetailRowView person={this.state.row} />
                    : null
                }
            </div>
        )
    }
}



export default App;
