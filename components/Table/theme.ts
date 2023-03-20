// --data-table-library_grid-template-columns: 140px repeat(6, 1fr); max-width: 90vw; width: 100%;

const mainTheme = (theme: 'light' | 'dark') => ({
  Table: ` 
  display: grid !important;
  border-radius: 8px;
  border: 1px solid #475569;
  `,
  Header: ``,
  Body: ``,
  BaseRow: `
    // background-color: #140C2D;
    // &.row-select-selected, &.row-select-single-selected {
    //   background-color: var(--theme-ui-colors-background-secondary);
    //   color: var(--theme-ui-colors-text);
    // }
  `,
  HeaderRow: `
    font-size: 12px;
    .th {
      border-bottom: 1px solid #94a3b8 !important;
    }
  `,
  Row: `
    font-size: 12px;  
    &:not(:last-of-type) .td {
        border-bottom: 1px solid #475569;
    }
    &:hover {
      td {
        background-color: #47556950;
      }
    }
  `,
  BaseCell: `
  background-color: #1e293b;
  color: #ffffff;
    // border-bottom: 1px solid transparent;
    // border-right: 1px solid transparent;
    &:nth-of-type(1) {
      left: 0px;
    }
  `,
  HeaderCell: ` 
  color: #ffffff;
  > div { 
    text-overflow: unset;
    white-space: unset;
  }`,
  Cell: `
  font-weight: 600; 
  color: #ffffff;`,
});

export const responsiveStylesForLayoutWithSideMenu = `          
max-width: calc(100vw - 200px);
width: 100%;
@media (max-width: 767px) {
  max-width: calc(100vw - 48px);
}`;

export default mainTheme;
