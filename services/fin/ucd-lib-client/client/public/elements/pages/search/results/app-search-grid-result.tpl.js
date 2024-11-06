import { html } from "lit";

export default function render() {
  return html`
    <style include="shared-styles">
      :host {
        display: block;
        width: var(--grid-cell-width);
        background-color: white;
      }

      [hidden] {
        display: none !important;
      }

      :host(:hover),
      :host(:focus) {
        /* border: 2px solid var(--default-secondary-color);
    margin: -2px 0 0 -2px;
    outline: none !important; */
      }

      @keyframes show-img {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      img {
        box-sizing: border-box;
        display: none;
        cursor: pointer;
      }

      img:hover,
      img:focus {
        border-color: var(--default-secondary-color);
      }

      .collection-name {
        color: var(--color-aggie-blue-70);
        font-size: 0.95rem;
      }

      .year {
        color: var(--gray-text);
        font-weight: var(--fw-light);
        flex: 1;
      }

      .footer {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }

      h4 {
        margin: 5px 0;
        color: var(--default-primary-color);
      }

      iron-icon {
        color: var(--default-primary-color);
      }

      .image {
        position: relative;
        background-size: cover;
        background-color: transparent;
        background-position: center center;
        /* max-width: 383px; */
      }

      .card-text {
        padding: 15px;
        line-height: 1.3;
      }

      .video-thumbnail {
        z-index: 1000;
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: url("https://via.placeholder.com/25");
      }

      @media (max-width: 768px) {
        .image {
          margin: auto;
        }
        .card-text {
          text-align: center;
        }
      }

      .media-type {
        position: absolute;
        right: 0.25rem;
        bottom: 0.25rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--color-aggie-blue-80);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem;
      }

      ucdlib-icon {
        width: 1.2rem;
        height: 1.2rem;
        fill: white;
      }
    </style>

    <!--hidden$="${!this.isImage}" -->
    <div class="image" id="imgRoot">
      <img
        id="img"
        src="${this.thumbnailUrl}"
        style="height: ${this.imageHeight}px; width: 100%; display: block"
        onload="this.style.display='block';"
      />
      <div ?hidden="${!this.isVideo}" class="video-thumbnail"></div>
      <div
          class="media-type"
          ?hidden="${!this.mediaType || this.mediaType === "image"}"
        >
          <ucdlib-icon
            ?hidden="${this.mediaType !== "imageList"}"
            class="vertical-link__image"
            icon="ucdlib-dams:item-stack-blank"
          ></ucdlib-icon>
          <ucdlib-icon
            style="margin-left: .2rem;"
            ?hidden="${this.mediaType !== "video"}"
            class="vertical-link__image"
            icon="ucdlib-dams:fa-play"
          ></ucdlib-icon>
          <ucdlib-icon
            ?hidden="${this.mediaType !== "audio"}"
            class="vertical-link__image"
            icon="ucdlib-dams:fa-volume-high"
          ></ucdlib-icon>
        </div>
    </div>

    <div class="card-text">
      <div class="collection-name">${this.title}</div>
    </div>
  `;
}
