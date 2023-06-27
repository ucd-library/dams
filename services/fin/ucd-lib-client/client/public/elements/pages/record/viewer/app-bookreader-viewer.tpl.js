import { html } from "lit";

let iaCss = require("@internetarchive/bookreader/BookReader/BookReader.css");

export default function render() {
  return html`
    <style>
      ${iaCss} :host {
        display: block;
        /* background: black; */
        padding: 20px 0;
        /* position: relative; */
        box-sizing: border-box;
        position: relative;
      }

      #loading {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 100%;
      }

      .layout {
        text-align: center;
      }

      [hidden] {
        display: none !important;
      }

      #BookReader {
        height: 634px;
        background-color: transparent;
      }

      #BookReader > div.BRtoolbar.header {
        display: none;
      }

      .BRbookcover {
        box-shadow: none;
      }

      .BRcontrols .scrubber .BRpager.ui-slider {
        background-color: #ccc;
      }

      .BRnav .BRpager .ui-slider-handle {
        background: #022851;
      }

      /* hide toolbar controls other than slider */
      .BRcontrols .controls .book_left,
      .BRcontrols .controls .book_right,
      .BRcontrols .controls .onepg,
      .BRcontrols .controls .twopg,
      .BRcontrols .controls .thumb,
      .BRcontrols .controls .icon-thumb,
      .BRcontrols .controls .viewmode,
      .BRcontrols .controls .zoom_out,
      .BRcontrols .controls .zoom_in,
      .BRcontrols .controls .full {
        display: none;
      }

      .BRnav,
      .BRcontrols .controls {
        background-color: transparent;
        border-top: none;
        box-shadow: none;
      }

      .BRcontrols .scrubber {
        height: 40px;
        margin: auto;
      }

      .BRcontrols .scrubber p {
        color: #022851;
      }

      .fullscreen .BRcontrols {
        width: 97%;
      }

      .BRcontrols {
        width: 60%;
        margin: auto;
      }

      .BRcontrols .controls {
        padding-left: 0;
        padding-right: 0;
        /* flex-direction: row-reverse; */
      }

      /* .BRcurrentpage-override  */
      .BRcurrentpage-override {
        margin: 0;
        font-size: 0.9rem;
        display: inline-block;
        position: relative;
        bottom: 6px;
      }

      .BRcurrentpage {
        display: none;
      }

      #prev,
      #next {
        width: 50px;
        height: 75px;
        display: inline-flex;
        vertical-align: sub;
        justify-content: center;
        cursor: pointer;
      }

      .zooms-in,
      .zooms-out {
        display: none;
      }

      .fullscreen .BRfooter {
        background-color: var(--color-aggie-blue-30);
        height: 75px;
      }

      .br-search {
        position: absolute;
        bottom: 75px;
        left: 0;
        /* width: 91px; */
        background-color: var(--color-aggie-blue-30);
        height: 75px;
        padding-right: 0.9rem;
      }

      .br-search div {
        display: inline-block;
      }

      .br-search div.zoom {
        background-color: var(--color-aggie-blue);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 25px;
        margin-top: 12.5px;
      }

      .br-search div.zoom.searching {
        background-color: var(--color-aggie-gold);
      }

      .br-search div.zoom {
        cursor: pointer;
      }

      .br-search ucdlib-icon {
        height: 50px;
        margin: auto;
      }

      .br-search .zoom ucdlib-icon {
        fill: white;
      }

      .br-search div.zoom.searching ucdlib-icon {
        fill: var(--color-aggie-blue);
      }

      .br-search::after {
        position: absolute;
        right: -1rem;
        top: 0;
        width: 1.8rem;
        height: 100%;
        background-color: var(--color-aggie-blue-30);
        content: "";
        transform: skewX(196deg);
      }

      #BookReader.fullscreen {
        height: 100%;
      }

      .BookReader .BRsearch:before,
      .BRmobileMenu .BRsearch:before,
      .BRfloat .BRsearch:before {
        width: 8px;
        height: 17px;
        background: var(--color-aggie-gold);
        bottom: -2px;
      }

      .BookReader .BRquery,
      .BRmobileMenu .BRquery,
      .BRfloat .BRquery,
      .BookReader .BRchapter > div,
      .BRmobileMenu .BRchapter > div,
      .BRfloat .BRchapter > div {
        bottom: calc(100% + 17px);
      }

      .BRprogresspopup {
        display: none;
      }

      .BookReader .searchHiliteLayer rect,
      .BRmobileMenu .searchHiliteLayer rect,
      .BRfloat .searchHiliteLayer rect {
        stroke: var(--color-redbud);
        stroke-width: 3;
        fill: #f555b140;
        fill-opacity: 0.6;
      }

      .BookReader .searchHiliteLayer rect,
      .BRmobileMenu .searchHiliteLayer rect,
      .BRfloat .searchHiliteLayer rect {
        animation: none;
      }

      .BookReader .BRquery b,
      .BRmobileMenu .BRquery b,
      .BRfloat .BRquery b {
        color: var(--color-thiebaud-icing);
        font-weight: bold;
        background-color: none;
      }

      #BookReader .BRcontainer {
        padding-bottom: 1rem;
      }

      .BookReader .BRsearch-navigation, 
      .BRmobileMenu .BRsearch-navigation, 
      .BRfloat .BRsearch-navigation {
        display: none;
      }

      @media (max-width: 767px) {
        /* mobile */
        .BRcontrols {
          width: 90%;
        }
      }
    </style>

    <button class="zooms-in" @click="${this._zoomIn}">Zoom In</button>
    <button class="zooms-out" @click="${this._zoomOut}">Zoom Out</button>

    <div id="BookReader" ?fullscreen=${this.fullscreen}></div>

    <div id="prev" @click="${this._prevPage}">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
    </div>

    <span class="BRcurrentpage-override"></span>

    <div id="next" @click="${this._nextPage}">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
    </div>
  `;
}
