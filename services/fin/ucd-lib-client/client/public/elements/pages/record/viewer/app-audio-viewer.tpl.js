import { html } from 'lit';
import plyrCss from "plyr/dist/plyr.css"

export default function render() { 
return html`
<style>
  :host {
    display: none;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
  }

  :host app-share-btn {
    fill: var(--color-aggie-blue-80);
  }

  .button {
    background-color: var(--color-aggie-blue-80);
    border-radius: 50%;
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-left: 0.4rem;
  }

  .container {
    display: block;
    width: 100%;
  }

  #audio_poster {
    display: none;
    margin: 0 auto;
    margin-bottom: 10px;
    max-width: 400px;
    height: 400px;
    border: 1px solid black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .layout {
    display: flex;
    justify-content: center;
    border-bottom: 6px dotted var(--color-aggie-gold);
    width: 60%;
    margin: 0 auto;
    padding-bottom: 0.7rem;
  }

  .plyr--audio {
    max-width: 500px !important;
    width: 100%;
    border-radius: 5px;
  }

  .plyr--full-ui input[type=range] {
    color: #daaa00 !important;
  }

  button.plyr__control.plyr__control--overlaid, 
  button.plyr__control.plyr__control:hover {
    background: var(--color-dams-secondary, #FFBF00);
  }
  .plyr--full-ui input[type=range] { 
    color: var(--color-dams-secondary, #FFBF00) !important;
  }

  .volume-icon {
    fill: var(--color-aggie-blue-50, #B0D0ED);
    height: 107px;
    margin: 0 auto;
  }

  @media(max-width: 768px) {

  }

  ${plyrCss}
</style>
<div class="container">
  <ucdlib-icon class="volume-icon" icon="ucdlib-dams:fa-volume-high"></ucdlib-icon>
  <div id="sprite-plyr" style="display: none;"></div>
  <div id="audio_poster"></div>

  <div class="layout">
    <audio id="audio_player" controls>
      <source>
    </audio>
    <div class="button"><app-share-btn></app-share-btn></div>
  </div>

</div>
`
}