import { html } from 'lit';
import { sharedStyles } from '../../styles/shared-styles';


export default function render() { 
return html`
<style>
  ${sharedStyles}
  
  :host {
    display: block;
    position: relative;
    z-index: 500;
    /* background-color: var(--color-aggie-blue-40) */
  }

  h2 {
    font-style: italic;
    font-weight: 700;
    text-align: center;
    color: var(--color-aggie-blue);
    font-size: 2rem;
  }

  .img-box {
    cursor: pointer;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 3px solid var(--color-aggie-blue-60); 
    height: 125px;
  }

  .img-box:hover {
    border: 3px solid var(--color-aggie-gold); 
    background-color: var(--color-aggie-gold);
  }

  .img-box img {
    /* TODO not working */
    /* fill: var(--color-aggie-blue-80); */
  }


</style>

<!-- TODO handle showing panels that exist -->

<admin-content-panel 
    @panel-loaded="${this._updateUiStyles}"
    type="single">
</admin-content-panel>
<admin-content-panel 
    @panel-loaded="${this._updateUiStyles}"
    type="text">
</admin-content-panel>
<admin-content-panel 
    @panel-loaded="${this._updateUiStyles}"
    type="cards">
</admin-content-panel>

<h2>Add Content:</h2>
<div style="display: flex; width: 50%; margin: 0 auto; justify-content: space-between">

    <div class="img-box">
        <img src="/images/icons/dams-admin-collection-single.svg" height="100%" />
    </div>
    <div class="img-box">
        <img src="/images/icons/dams-admin-text.svg" height="100%" />
    </div>
    <div class="img-box">
        <img src="/images/icons/dams-admin-collection-cards.svg" height="100%" />
    </div>

</div>
`;}
