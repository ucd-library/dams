import { html } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
export default function render() {
  return html`
    <style include="shared-styles">
  :host {
    display: block;
    color: var(--color-white);
  }
  [hidden] {
    display: none !important;
  }
  a {
    color: var(--color-white);
    cursor: pointer;
    display: block;
    padding: var(--spacing-half);
    text-decoration: underline;
  }
  a:hover {
    background-color: var(--color-aggie-blue-80);
    border-radius: 4px;
    color: var(--color-white);
  }
</style>

<div>
  <span ?hidden="${!this.loggedIn}">Logged in as: ${this.user.preferred_username}</span>
  <a ?hidden="${this.loggedIn}" href="/auth/login?redirectUrl=${this.path}">Login</a>
  <div ?hidden="${!this.loggedIn}">
    <a @click="${this._logout}" class="gold">Log Out</a>
  </div>
</div>
`;
}
