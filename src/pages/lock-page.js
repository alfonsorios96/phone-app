import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';

class LockPage extends PageDM {
    static get styles() {
        return css`
            :host {
                font-size: 12px;
            }
            
            .container {
                width: 100%;
                height: 100%;   
                 background-image: url('images/phone-background.jpg');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center;
                color: white;
                
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
            
            .primary {
                 width: 0 auto;
                 height: 60px;
                 font-size: 3rem;
            }
            
            .secondary {
                 width: 400px;
                 height: 60px;   
                 font-size: 2rem;
            }
      `;
    }

    static get properties() {
        return {
            _currentTime: String
        };
    }

    connectedCallback() {
        super.connectedCallback();
        setInterval(() => {
            this._currentTime = this._getTimeFormatted;
        }, 1000);
    }

    get _getDateFormatted() {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const currentDate = new Date();
        return `${currentDate.getDate()} de ${months[currentDate.getMonth()]} del ${currentDate.getFullYear()}`;
    }

    get _getTimeFormatted() {
        const today = new Date();
        return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    }

    render() {
        return html`
        <section class="container" @click="${this.unlock}">
            <span class="primary">${this._currentTime}</span>
            <span class="secondary">${this._getDateFormatted}</span>
        </section> 
      `;
    }

    unlock(){
        this.dispatchEvent(new Event('unlock-phone'));
    }
}

window.customElements.define('lock-page', LockPage);
