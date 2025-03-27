import styled from "styled-components";

export const Button = styled.button`
  padding: 10px 20px;
  color: #111;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #111;
  &:hover {
    background: #eee;
  }
`;

export const Input = styled.input`
  margin: 5px;
  padding: 5px;
  width: 200px;
  text-align: center;
`;

export const TableWrapper = styled.table`
  position: relative;
  height: 100%;
  text-align: left;
  display: block;
  overflow: overlay;
  white-space: nowrap;
  border-spacing: 0;
  border-collapse: separate;
`;

export const TableHeaderRow = styled.tr`
  height: 40px;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;
  th {
    font-size: 14px;
    font-weight: 600;
    color: #ddd;
    text-align: left;
    padding: 0px 15px;
    border-bottom: 1px solid #eee;
    width: 100vw;
  }
`;

export const TableItemRow = styled.tr`
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
  td {
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid #eee;
    height: 60px;
    text-align: left;
    padding: 0px 15px;
    max-width: 220px;
    border-bottom: 1px solid #eee;
    &.name {
      font-weight: 600;
    }
    &.textHidden {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
`;
