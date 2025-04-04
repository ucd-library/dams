import { html } from 'lit';
// import { styleMap } from 'lit/directives/style-map';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }
  .container {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  .img-container {
    width: 100%;
    position: relative;
    padding-top: 75%;
    background-image: url(/images/logos/logo-white-512.png);
    background-color: var(--color-black-20);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .img-container img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .head {
    border: 3px solid transparent;
    transition: .3s;
  }
  .container:hover .head, .container:focus .head {
    border: 3px solid var(--color-dams-secondary);
  }
  h5 {
    margin: 10px 0 5px 0;
    color: var(--color-h5);
    font-size: var(--fs-h5);
    font-weight: var(--fw-h5);
  }
  .subtitle {
    font-size: var(--fs-p);
    font-weight: var(--fw-extra-bold);
    color: var(--color-aggie-blue-70);
    margin-bottom: 20px;
  }
  .gold-dots {
    width: 0;
    transition: .4s;
    border-bottom: 5px dotted var(--color-dams-secondary);
  }
  .container:hover .gold-dots, .container:focus .gold-dots {
    width: 100%;
  }

  .marketing-highlight {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .marketing-highlight:hover .marketing-highlight__image .u-background-image {
    transform: scale(1.1);
  }

  .marketing-highlight__image {
    position: relative;
    overflow: hidden;
    margin: 1rem 0;
  }

  .marketing-highlight__image .u-background-image {
    transition: transform .3s ease-in-out;
  }

  .marketing-highlight__title {
    font-size: 1.2rem;
    margin-bottom: 0;
    padding-top: 0;
    margin-top: 0;
    line-height: 1.2;
  }

  .marketing-highlight__items {
    font-size: 1rem;
    color: var(--color-aggie-blue-80);
    font-weight: 600;
    line-height: 1.25;
    margin: 0.5rem 0 1rem;
  }

  .u-background-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .u-background-image.loading {
    background-color: #dcdcdc;
  }

  .aspect--4x3 {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 75%;
  }

  .marketing-highlight__body.dark h4 {
    color: var(--color-white);
    /* font-size: 1.5rem; */
    text-align: left;
  }

  .marketing-highlight__body.dark p {
    color: var(--color-black-30);
    /* font-size: 1.1rem; */
    text-align: left;
  }

  .marketing-highlight__body.dark {
    padding-top: 0.5rem;
  }

</style>  

<!-- <div class="container"><a href="${this.href}">
  <div class="head">
    <div class="img-container">
      ${this.imgSrc ? html`
        <img src="${this.imgSrc}">
      ` : html``}
    </div>
  </div>
  <div class="body">
    <h5>${this.cardTitle}</h5>
    <div class="subtitle">${this.itemCt} item${this.itemCt === 1 ? "" : "s"}</div>
  </div>
  <div class="footer">
    <div class="gold-dots"></div>
  </div></a>
</div> -->


<a href="${this.href}" class="marketing-highlight category-brand--secondary u-space-mb o-box">
  <div class="marketing-highlight__image">
    <div class="aspect--4x3 u-background-image ${this.loading ? 'loading' : ''}" role="img" aria-label="" style="background-image:url(${this.imgSrc})">
  </div>
  </div>
  <div class="marketing-highlight__body ${this.darkBg ? 'dark' : ''}">
    <h4 class="marketing-highlight__title">${this.cardTitle}</h4>
    <p class="marketing-highlight__items"><span ?hidden="${!this.itemCt}">${this.itemCt || 0} item${this.itemCt == 1 ? '' : 's'}</span></p>
  </div>
</a>



`;}