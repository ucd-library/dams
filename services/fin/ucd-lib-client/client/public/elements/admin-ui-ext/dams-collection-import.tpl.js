import { html, css } from 'lit';

export function render() { 
return html`
  <style>
    dams-collection-import {
      display: block;
    }

    dams-collection-import .ci-row {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }

    dams-collection-import pre.logs {
      overflow: auto;
      max-height: 250px;
      background: black;
      color: white;
    }
  </style>

  ${this.collectionList.map(item => html`
    <div class="ci-row">
      <div>${item.id}</div>
      <div style="padding: 5px">${item.statusDetails}</div>
      <div>
        <div ?hidden="${item.state !== 'not-running'}">
          <button @click="${() => this._onCollectionImportClicked(item.id)}">Run Import</button>
        </div>
        <div ?hidden="${item.state !== 'running'}">
          <button @click="${() => this._onForceStopClicked(item.id)}">Force Stop</button>
        </div>
        <div ?hidden="${item.state !== 'finished'}">
          <button @click="${() => this._onRerunImportClicked(item)}">Rerun Import</button>
        </div>
        <div ?hidden="${item.state !== 'finished' && !item.volume}">
          <input type="checkbox" id="ibs-input-${item.id}" checked> Ignore Binary Sync
        </div>
      </div>
    </div>
    <div ?hidden="${!item.logs}">
      <pre class="logs" collection-id="${item.id}" auto-scroll>${item.logs || ''}</pre>
    </div>
  `)}
`;}