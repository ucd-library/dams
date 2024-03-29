import { html } from "lit";

export default function render() {
  return html`
    <style>
      :host {
        display: block;
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: var(--max-width);

        color: white;
        background: var(--default-primary-color);
      }

      footer {
        padding: 70px 35px 20px 20px;
      }

      a {
        cursor: pointer;
        color: var(--inverse-text-color);
        text-decoration: none;
      }

      .lib-logo {
        margin-bottom: 30px;
      }

      .lib-logo img {
        height: 45px;
        max-width: 200px;
      }

      .lib-email:hover {
        text-decoration: underline;
      }

      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }

      ul,
      ul li {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .menu.vertical a {
        display: block;
        padding: 4px;
      }

      .menu.vertical a:hover {
        background-color: var(--default-primary-color);
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
      }

      .menu.horizontal {
        display: block;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .menu.horizontal li {
        display: inline-block;
        white-space: nowrap;
      }
      .menu.horizontal li a {
        display: block;
      }
      .menu.horizontal li a::after {
        content: "|";
        padding: 0 10px;
      }
      .menu.horizontal li:last-child a::after {
        content: " ";
      }

      .donate {
        margin-top: 15px;
      }
      .donate > a {
        display: inline-block !important;
        padding: 8px !important;
        font-weight: 700;
        border: 1px solid white;
        white-space: normal !important;
      }
      .donate > a:hover {
        background: rgba(21, 118, 240, 0.32) !important;
      }

      .ucd-logo {
        display: inline-block;
        margin-top: 70px;
        margin-bottom: 30px;
        width: 100%;
        position: relative;
      }
      .ucd-logo > hr {
        margin-top: 0;
        margin-bottom: 0;
        top: 50%;
        width: 100%;
        position: absolute;
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        border-bottom: none;
        border-right: none;
        border-left: none;
      }
      .ucd-logo > div {
        display: inline-block;
        position: relative;
      }
      .ucd-logo > div > img {
        padding: 0 25px;
        height: 100px;
        background: var(--default-primary-color);
      }

      @media (max-width: 768px) {
        .row {
          flex-direction: column;
          text-align: left;
        }

        h2 {
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .menu.vertical li a {
          padding: 0;
        }
      }
    </style>

    <footer role="contentinfo">
      <div class="row">
        <div class="col">
          <!-- col start -->
          <div class="lib-logo">
            <a
              href="https://library.ucdavis.edu"
              target="_blank"
              rel="noopener"
            >
              <img
                src="/images/ucd-lib-logo-white.png"
                alt="UC Davis Library Logo"
              />
            </a>
          </div>
          <p>
            UC Davis Library<br />
            100 NW Quad<br />
            University of California, Davis<br />
            Davis, CA 95616<br />
            (530) 752-8792<br /><br />
            <a href="mailto:library@ucdavis.edu" class="lib-email"
              >library@ucdavis.edu</a
            >
          </p>

          <!-- Build Info -->
          <div ?hidden="${this.showVersion}">
            <div><b>Build Information</b></div>
            <div>App Version: ${this.appVersion}</div>
            <div>Build Time: ${this.localBuildTime}</div>
            <div>Build Number: ${this.buildNum}</div>
            <div>Client Env: ${this.clientEnv}</div>
            <div>Fin App Version: ${this.finAppVersion}</div>
            <div>Fin Branch Name: ${this.finBranchName}</div>
            <div>Fin Repo Tag: ${this.finRepoTag}</div>
            <div>Fin Server Image: ${this.finServerImage}</div>
            <div>Fin Server Repo Hash: ${this.finServerRepoHash}</div>
            <div>DAMS Deployment Branch: ${this.damsDeployBranch}</div>
            <div>DAMS Deployment SHA: ${this.damsDeploySha}</div>
            <div>DAMS Deployment Tag: ${this.damsDeployTag}</div>
            <div>DAMS Repo Branch: ${this.damsRepoBranch}</div>
            <div>DAMS Repo SHA: ${this.damsRepoSha}</div>
            <div>DAMS Repo Tag: ${this.damsRepoTag}</div>
          </div>
        </div>
        <!-- col end -->

        <div class="col" role="navigation">
          <!-- col start -->
          <h2>Digital Collections</h2>
          <ul class="menu vertical">
            <li><a href="/collections">Collections</a></li>
            <li><a href="/search">Items</a></li>
            <li><a href="/about">About Digital Collections</a></li>
          </ul>
        </div>
        <!-- col end -->

        <div class="col" role="navigation">
          <!-- col start -->
          <h2>Library Info</h2>
          <ul class="menu vertical">
            <li>
              <a
                href="https://library.ucdavis.edu/special-collections/"
                target="_blank"
                rel="noopener"
                >Special Collections</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/news/"
                target="_blank"
                rel="noopener"
                >News</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/about/"
                target="_blank"
                rel="noopener"
                >About the Library</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/library/"
                target="_blank"
                rel="noopener"
                >Visit</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/service/careers/"
                target="_blank"
                rel="noopener"
                >Careers</a
              >
            </li>
            <li class="donate">
              <a
                href="http://give.ucdavis.edu/ULIB"
                target="_blank"
                rel="noopener"
                >Give to the UC Davis Library</a
              >
            </li>
          </ul>
        </div>
        <!-- col end -->

        <div class="col" role="navigation">
          <!-- col start -->
          <h2>Account</h2>
          <ul class="menu vertical">
            <li>
              <app-auth-footer></app-auth-footer>
            </li>
          </ul>
        </div>
        <!-- col end -->
      </div>
      <!-- row end -->

      <div class="bottom-links" style="text-align: center;">
        <div class="ucd-logo">
          <!-- ucd-logo -->
          <hr />
          <div>
            <img src="/images/ucd-logo.svg" alt="UC Davis Logo" />
          </div>
        </div>

        <div>
          <p>
            University of California, Davis, One Shields Avenue, Davis, CA 95616
            | 530-752-1011
          </p>
          <ul class="menu horizontal">
            <li><a href="/help/">Help</a></li>
            <li><a href="/general-support/">Questions or comments?</a></li>
            <li>
              <a
                href="https://www.ucdavis.edu/help/privacy-accessibility/"
                target="_blank"
                rel="noopener"
                >Privacy &amp; Accessibility</a
              >
            </li>
            <li>
              <a
                href="https://occr.ucdavis.edu/poc/"
                target="_blank"
                rel="noopener"
                >Principles of Community</a
              >
            </li>
            <li>
              <a href="https://www.ucdavis.edu/" target="_blank" rel="noopener"
                >UC Davis</a
              >
            </li>
            <li>
              <a
                href="https://www.universityofcalifornia.edu/"
                target="_blank"
                rel="noopener"
                >University of California</a
              >
            </li>
          </ul>
          <p>
            Copyright &copy; 2020 The Regents of the University of California,
            Davis campus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;
}
