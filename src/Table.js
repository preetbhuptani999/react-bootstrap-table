import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { DropdownButton } from 'react-bootstrap';
import dataSet from './dataset.json';

  // const statusType = {
  //   'COMPLETE': 'COMPLETE',
  //   'INCOMPLETE': 'INCOMPLETE',
  //   'ERROR': 'ERROR'
  // };

class CheckboxFilter extends React.Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);
    this.isFiltered = this.isFiltered.bind(this);
  }

  filter(event) {
    if (this.refs.completeCheckbox.checked && this.refs.IncompleteCheckbox.checked && this.refs.errorCheckbox.checked) {
      // all checkboxes are checked means we want to remove the filter for this column
      this.props.filterHandler();
    } else {
      this.props.filterHandler({ callback: this.isFiltered });
    }
  }

  isFiltered(targetValue) {
    if (targetValue === 'COMPLETE') {
      return (this.refs.completeCheckbox.checked);
    } else if (targetValue === 'INCOMPLETE') {
      return (this.refs.IncompleteCheckbox.checked);
    } else if (targetValue === 'ERROR') {
      return (this.refs.errorCheckbox.checked);
    }
  }

  cleanFiltered() {
    this.refs.completeCheckbox.checked = true;
    this.refs.IncompleteCheckbox.checked = true;
    this.props.filterHandler();
  }

  render() {
    return (
      <div className="123">
        <DropdownButton
          trigger=""
          multiple
          title={<span>{'Select Status >'} </span>}
          id="dropdown-basic"
        >
          <div className="dropdown-menu">
            <div><input ref='completeCheckbox' type='checkbox' className='filter' onChange={this.filter} defaultChecked={true} /><label>{this.props.completeText}</label></div>
            <div><input ref='IncompleteCheckbox' type='checkbox' className='filter' onChange={this.filter} defaultChecked={true} /><label>{this.props.incompleteText}</label></div>
            <div><input ref='errorCheckbox' type='checkbox' className='filter' onChange={this.filter} defaultChecked={true} /><label>{'Error'}</label></div>
          </div>
        </DropdownButton>
      </div>
    );
  }
}

CheckboxFilter.propTypes = {
  filterHandler: PropTypes.func.isRequired,
  completeText: PropTypes.string,
  incompleteText: PropTypes.string,
  errorText: PropTypes.string
};

CheckboxFilter.defaultProps = {
  completeText: 'COMPLETE',
  incompleteText: 'INCOMPLETE',
  errorText: 'ERROR'
};

class Table extends React.Component {
  render() {

    function getCustomFilter(filterHandler, customFilterParameters) {
      return (
        <div>
          <CheckboxFilter filterHandler={filterHandler} completeText={customFilterParameters.completeText} incompleteText={customFilterParameters.incompleteText} />
        </div>
      );
    }

    return (
      <div>
        <BootstrapTable
          data={dataSet || []}
          hover
          striped
          //   columnFilter
          //   search
          responsive
        >
          <TableHeaderColumn
            dataField="firstName"
            width="15%"
            thStyle={{ width: '150px', padding: '10px', marginBottom: '30px' }}
            tdStyle={{ width: '150px', padding: '10px' }}
            isKey
          >
            First name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="lastName"
            width="15%"
            thStyle={{ width: '150px', padding: '10px' }}
            tdStyle={{ width: '150px', padding: '10px' }}
          >
            Last name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="carrier"
            width="15%"
            thStyle={{ width: '150px', padding: '10px' }}
            tdStyle={{ width: '150px', padding: '10px' }}
          >
            Carrier
          </TableHeaderColumn>
          {/* <TableHeaderColumn
              dataField="status"
              width="15%"
              filter={ { type: 'SelectFilter', options: statusType, condition: 'eq' }}
              thStyle={{width: '150px', padding: '10px'}}
              tdStyle={{width: '150px', padding: '10px'}}
            >
              Status
            </TableHeaderColumn> */}
          <TableHeaderColumn
            dataField="status"
            width="15%"
            thStyle={{ width: '150px', padding: '10px' }}
            tdStyle={{ width: '150px', padding: '10px' }}
            filter={{ type: 'CustomFilter', getElement: getCustomFilter, customFilterParameters: { completeText: 'COMPLETE', incompleteText: 'INCOMPLETE', errorText: 'ERROR' } }}
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="eventDate"
            width="15%"
            thStyle={{ width: '150px', padding: '10px' }}
            tdStyle={{ width: '150px', padding: '10px' }}
          >
            Date
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default Table;
