import {html, css} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-button';

class HomePage extends PageDM {
    static get styles() {
        return css`
        h2 {
            margin-left: 5%;
        }
        
        .container {
            margin-left: 10%;
            display: flex;
            flex-wrap: wrap;
        }
        
        .app {
            display: flex;
            flex-direction: column;
            
            flex-grow: 1;
              width: 25%;
              height: 100px;
        }
        
        .app img {
            width: 60px;
        }
      `;
    }

    static get properties() {
        return {
            apps: Array
        };
    }

    constructor() {
        super();
        this.apps = [];
    }

    render() {
        return html`
      <h2>My Apps</h2>
      <paper-button @click="${this._goToStore}">Store</paper-button>
      <section class="container">
      ${this.apps.map(app => html`
        <paper-button class="app">
            <img src="${app.image}">
            <span>${app.name}</span>
        </paper-button>
      `)}
</section>
    `;
    }

    _goToStore() {
        this.dispatchEvent(new CustomEvent('navigate-page', {
            detail: {
                page: 'store'
            }
        }));
    }
}

window.customElements.define('home-page', HomePage);
