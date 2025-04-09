import React, { Component } from "react";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 5, // Number of rows per page
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPaginationRange = (totalPages) => {
    const { currentPage } = this.state;
    const visiblePages = 5; // Adjust the number of pages shown in the pagination bar
    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  render() {
    const { headers, data } = this.props;
    const { currentPage, itemsPerPage } = this.state;

    // Calculate pagination indices
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationRange = this.getPaginationRange(totalPages);

    return (
      <div className="table-container">
        <div className="table-top-content">
          <p>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} entries
          </p>
        </div>
        <div className="table-middle-content">
          <table className="table">
            <thead>
              <tr>
                <th><input type="checkbox"/></th>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td><input type="checkbox"/></td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-bottom-content">
          {/* Elided Pagination Controls */}
          <div>
            {currentPage > 1 && (
              <button onClick={() => this.handlePageChange(1)}>First</button>
            )}
            {currentPage > 1 && (
              <button onClick={() => this.handlePageChange(currentPage - 1)}>
                Previous
              </button>
            )}

            {paginationRange.map((page) => (
              <button
                key={page}
                onClick={() => this.handlePageChange(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            ))}

            {currentPage < totalPages && (
              <button onClick={() => this.handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => this.handlePageChange(totalPages)}>
                Last
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TableComponent;