import {html, css} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-button';

class StorePage extends PageDM {
    static get styles() {
        return css`
        h2 {
            margin-left: 5%;
        }
        
        .container {
            margin-left: 10%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        
        .app {
            display: flex;
            flex-direction: column;
              height: 100px;
        }
        
        .app img {
            width: 60px;
        }
        
        .logo {
            display: flex;
            flex-direction: column;
        }
        
        paper-button {
            height: 20px;
            color: white;
            width: 100%;
        }
        
        .install {
            background-color: #28a745;
        }
        
        .remove {
            background-color: #dc3545;
        }
      `;
    }

    static get properties() {
        return {
            store: Array
        };
    }

    constructor() {
        super();
        this.store = [];
        this._initStore();
    }

    render() {
        return html`
      <h2>Tienda</h2>
      <section class="container">
      ${this.store.map(app => html`
        <div class="app">
            <div class="logo">
                <img src="${app.image}">
                <span>${app.name}</span>
            </div>
            ${sessionStorage.getItem(app.uid) !== null ?
            html`<paper-button class="remove" @click="${this._removeApp}" .uid="${app.uid}">Remove</paper-button>` :
            html`<paper-button class="install" @click="${this._installApp}" .uid="${app.uid}" .app="${app.url}">Install</paper-button>`}
        </div>
      `)}
</section>
    `;
    }

    _initStore() {
        (async () => {
            const response = await fetch('http://localhost:5000/catalog', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem('suid')
                }
            });
            const payload = await response.json();
            this.store = [...payload];
        })();
    }

    _removeApp(event) {
        const appId = event.currentTarget.uid;
        sessionStorage.removeItem(appId);
        this.store = [...this.store];
    }

    _installApp(event) {
        const appId = event.currentTarget.uid;
        sessionStorage.setItem(appId, event.currentTarget.app);
        this.store = [...this.store];
        this.dispatchEvent(new CustomEvent('app-installed', {
            detail: appId
        }));
    }
}

window.customElements.define('store-page', StorePage);
