import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  .row-cursor-pointer {
    .ag-row {
      cursor: pointer;
    }
  }
`;

export default function Grid({ colDefs, rowData, onRowClick, pagination }) {
  return (
    <Wrapper className="ag-theme-quartz">
      <AgGridReact
        className={onRowClick ? 'row-cursor-pointer' : ''}
        defaultColDef={{
          resizable: true,
          autoHeight: true,
          flex: 1
        }}
        rowData={rowData}
        columnDefs={colDefs}
        onRowClicked={onRowClick}
        pagination={pagination}
        paginationPageSize={20}
        paginationPageSizeSelector={[20, 50, 100, 200]}
        suppressDragLeaveHidesColumns={true}
      />
    </Wrapper>
   );
}