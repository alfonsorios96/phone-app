import {css} from 'lit-element';

export const styles = css`
:host {
    display: grid;
    min-height: 100vh;
    grid-template-areas:
    "header header header"
    "main   main   main"
    "footer footer footer";
    grid-template-rows: auto 1fr auto;
}
.header-app {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    grid-area: header;
    min-height: 60px;
    line-height: 30px;
    background-color: #7986CB;
    color: #e5e5e5;
}
.main-app {
    grid-area: main;
}
.footer-app {
    grid-area: footer;
    height: 60px;
    display: flex;
    justify-content: flex-start;
}
.container-footer {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
}
.title {
    color: white;
    font-weight: lighter;
    font-size: 1.5rem;
    flex: 1 auto;
}
`;
