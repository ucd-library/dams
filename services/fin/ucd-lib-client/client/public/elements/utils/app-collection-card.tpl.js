import { html } from 'lit';

export default function render() {
return html`

<style>
  :host {
    display: inline-block;
    margin: 15px;
    outline : 0;
    height: 320px;
    width: 320px;
  }

  :host(:hover), :host(:focus)  {
    cursor: pointer;
    margin: 13px;
    border: 2px solid var(--default-secondary-color);
  }

  .img.defaultImage {
    background-size: 65%;
  }

  .img {
    height: 320px;
    width: 320px;
    position: relative;
    background-image: url('/images/logos/logo-white-512.png'); /* fallback */
    background-color: var(--light-background-color);
    background-size: cover; /* needs to be 65% */
    background-repeat: no-repeat;
    background-position: center center;    
  }

  .img > div  {
    padding: 15px;
    position: absolute;
    left: 0;
    right: 25px;
    bottom: 25px;
    
    color: var(--default-secondary-color);
    font-weight: var(--fw-bold);

    background-color: rgba(0, 38, 85, .8);      
  }
</style>

<div 
  id="img"
  class="img" 
  role="img" 
  aria-label="${this.collection.title}">
  <div>
    <div>${this.collection.title}</div>
    <div>42 items</div>
  </div>
</div>

`;}