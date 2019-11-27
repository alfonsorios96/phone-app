import {LitElement, html} from 'lit-element';
import '@polymer/paper-button/paper-button.js';

// These are the elements needed by this element.
import {styles} from './final-project-styles.js';
import {fadeInTransitionPage} from './utils/final-project-transitions.js';
import {menuIcon, backIcon, stackMenu} from './utils/final-project-icons.js';

import './pages/lock-page.js';
import './pages/home-page.js';
import './pages/store-page.js';

class FinalProject extends LitElement {
    static get properties() {
        return {
            appTitle: {type: String},
            _page: {type: String}
        };
    }

    static get styles() {
        return [
            styles,
            fadeInTransitionPage
        ];
    }

    render() {
        return html`
      <style>
        .main-app.out {
              animation: ${this._config.transition.type}TransitionPage ${this._config.transition.delay / 1000}s;
          }
      </style>
      <!-- Header -->
      <header class="header-app">
        <div class="title container-app">
          Proyecto de graduacion
        </div>
        <nav class="navbar-principal">
          
        </nav>
      </header>
      <!-- Main content -->
      <main role="main" class="container-app main-app">
        ${
            this._page === 'home' ?
                html`<home-page class="page" active @navigate-page="${this.navigate}" .apps="${this.apps}"></home-page>` :
                ''
        }
        ${
            this._page === 'lock' ?
                html`<lock-page class="page" active @unlock-phone="${this._unlockPhone}"></lock-page>` :
                ''
        }
        ${
            this._page === 'store' ?
                html`<store-page class="page" @app-installed="${this.installApp}" active></store-page>` :
                ''
        }
      </main>
      
      <footer class="footer-app">
        <div class="container-footer">
          <paper-button @click="${this._lockPhone}">
          ${backIcon}
</paper-button>
          <paper-button @click="${this._lockPhone}">
          ${menuIcon}
</paper-button>
          <paper-button @click="${this._lockPhone}">
          ${stackMenu}
</paper-button>
        </div>
      </footer>
    `;
    }

    constructor() {
        super();
        this.apps = [];
        this._page = 'store';
        this._config = {
            type: 'app',
            transition: {
                type: 'fadeIn',
                delay: 500
            }
        }
    }

    changePage(event) {
        const page = event.currentTarget.getAttribute('page');
        this._page = page;
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            const pageOut = this.shadowRoot.querySelector('.main-app');
            pageOut.classList.add('out');
            setTimeout(() => {
                pageOut.classList.remove('out');
            }, this._config.transition.delay);
        }
    }

    navigate(event) {
        if (event.detail) {
            this._page = event.detail.page;
        } else {
            this._page = event;
        }
    }

    installApp(event) {
        const appId = event.detail;
        this._resolveDependency(appId, wc => {
            this.apps = [...this.apps, wc];
        });
    }

    uninstallApp(event) {

    }

    _resolveDependency(appId, callback) {
        (async () => {
            const webComponent = await (await fetch(`http://localhost:5000/catalog/${appId}`, {
                headers: {'x-access-token': sessionStorage.getItem('suid')}
            })).json();
            callback(webComponent);
        })();
    }

    _unlockPhone() {
        this.navigate('home');
    }

    _lockPhone() {
        this.navigate('lock');
    }
}

window.customElements.define('final-project-app', FinalProject);
