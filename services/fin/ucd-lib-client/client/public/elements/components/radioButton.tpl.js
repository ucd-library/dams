import { html } from 'lit';
import { sharedStyles } from "../styles/shared-styles";
// import { classMap } from 'lit/directives/class-map';
// import { styleMap } from 'lit/directives/style-map';

export default function render() { 
return html`
<style>
  :host {
    display: block;
    position: relative;
    background-color: var(--super-light-background-color);
  }

  fieldset {
    text-align:center;
  }
  .radioMenu {
    text-align:center;
  }

  ${sharedStyles}


</style>
<div class="radioMenu">   
<p>
  <b>Sort by:</b>
    ${this.choices.map(choice => html`
      <input type="radio" class="radio" name="sort-menu" value="${choice.text}" id="${choice.text}" />
      <label class="radio" for="${choice.text}">${choice.text}</label>
    `)}
    </p>
  </div> 
`;}