import { TVariant } from "@/types";
import styled, { css } from "styled-components";

export const device = {
  mobile: "(max-width: 480px)",
  tablet: "(max-width: 768px)",
  desktop: "(min-width: 769px)",
};

export const Button = styled.button<{ $variant?: TVariant }>`
  padding: 10px 20px;
  color: #111;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #111;
  white-space: nowrap;
  &:hover {
    background: #eee;
  }
  ${({ $variant }) =>
    $variant === "gray" &&
    css`
      color: #111;
      background: #f5f5f5;
      border: none;
      &:hover {
        background: #ddd;
      }
    `}
  ${({ $variant }) =>
    $variant === "black" &&
    css`
      color: #fff;
      background: #111;
      border: none;
      &:hover {
        background: #333;
      }
    `}
  ${({ $variant }) =>
    $variant === "blue" &&
    css`
      color: #fff;
      background-color: #0d6dff;
      border: none;
      &:hover {
        background: #4b94fa;
      }
    `}
    ${({ $variant }) =>
    $variant === "red" &&
    css`
      color: #fff;
      background-color: #ff3126;
      border: none;
      &:hover {
        background: #fa6057;
      }
    `}
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
    font-size: 18px;
    font-weight: 700;
    color: #111;
    text-align: left;
    padding: 0px 15px;
    border-bottom: 1px solid #eee;
    width: 100vw;
    @media ${device.mobile} {
      max-width: 110px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
`;

export const TableItemRow = styled.tr`
  td {
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #eee;
    height: 60px;
    text-align: left;
    padding: 0px 15px;
    max-width: 220px;
    border-bottom: 1px solid #eee;
  }
`;

export const TableFootRow = styled.tr`
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
  td {
    font-size: 18px;
    font-weight: 700;
    color: #111;
    border-bottom: 1px solid #eee;
    height: 60px;
    text-align: left;
    padding: 0px 15px;
    max-width: 220px;
    border-top: 1px solid #eee;
  }
`;
