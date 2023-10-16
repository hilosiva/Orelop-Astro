export default class Loading {
  constructor(options, loadingAnimation, introAnimation) {
    this.resizeTimeoutId;
    this.loadingTimerId;
    this.isLoaded = false;
    this.isAnimated = false;
    this.isVisited = false;
    this.isPrefersReducedMotion = false;
    // this.loading = loading;
    this.loadingAnimation = loadingAnimation;
    this.introAnimation = introAnimation;

    this.defaultOptions = {
      isJS: true,
      isLoad: true,
      isIos: true,
      isResize: true,
      isPrefersReducedMotion: true,
      once: true,
      turbo: false,
      targetSelector: "html",
    };

    this.options = Object.assign(this.defaultOptions, options);
    this.targetElem = document.querySelector(this.options.targetSelector);

    if (!this.targetElem) {
      return;
    }

    this._init();
  }

  async _init() {
    if (this.options.isJS) {
      this.targetElem.classList.remove("is-noJs");
    }

    if (this.options.once) {
      // 訪問状況を確認
      this._getVisited();
    }

    // ローディング

    // this.isAnimated = this.loading ? await this.loading() : true;

    // ロード
    if (this.options.isLoad) {
      if (!this.options.turbo) {
        window.addEventListener("load", this._loding.bind(this));
      } else {
        document.documentElement.addEventListener("turbo:click", this.click.bind(this));
        document.documentElement.addEventListener("turbo:before-visit", this.beforeVisit.bind(this));
        document.documentElement.addEventListener("turbo:visit", this.visit.bind(this));
        document.documentElement.addEventListener("turbo:before-render", this.beforeRender.bind(this));
        document.documentElement.addEventListener("turbo:render", this.render.bind(this));
        document.documentElement.addEventListener("turbo:load", this._loding.bind(this));
      }
    }

    // カスタムイベント
    // イベントの作成
    this.event = new CustomEvent("pageLoaded");

    // prefersReducedMotion
    if (this.options.isPrefersReducedMotion) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      this.isPrefersReducedMotion = mediaQuery.matches;

      mediaQuery.addEventListener("change", () => {
        this.isPrefersReducedMotion = mediaQuery.matches;
      });
    }

    // IOS
    if (this.options.isIos) {
      this._checkIos();
    }

    // Resize
    if (this.options.isResize) {
      window.addEventListener("resize", this._resize.bind(this), { passive: true });
    }
  }

  click() {
    document.documentElement.classList.add("is-before");
  }
  beforeVisit() {
    document.documentElement.classList.add("is-transition");
    document.documentElement.classList.remove("is-before");
    document.documentElement.classList.add("is-enter-from");
    document.documentElement.classList.add("is-enter-active");
  }
  visit() {
    document.documentElement.classList.remove("is-enter-from");
    document.documentElement.classList.add("is-enter-to");
  }

  beforeRender() {
    document.documentElement.classList.remove("is-enter-to");
    document.documentElement.classList.remove("is-enter-active");
    document.documentElement.classList.add("is-leave-from");
    document.documentElement.classList.add("is-leave-active");
  }
  render() {
    document.documentElement.classList.remove("is-leave-from");
    document.documentElement.classList.add("is-leave-to");
  }

  async _loding() {
    document.documentElement.classList.remove("is-leave-to");
    document.documentElement.classList.remove("is-leave-active");
    this.targetElem.classList.add("is-loaded");

    if (!this.options.once || !this.isVisited) {
      this.isLoaded = this.loadingAnimation ? await this.loadingAnimation() : true;
    } else {
      this.isLoaded = true;
      this.targetElem.classList.add("is-start");
    }

    if (this.options.once) {
      this._setVisited();
    }

    // 画像の読み込み
    const img_elements = document.querySelectorAll("img[loading='eager']");

    let counter = 0;

    if (img_elements.length) {
      await new Promise((resolve, reject) => {
        img_elements.forEach((imgElem) => {
          const isLoaded = imgElem.complete && imgElem.naturalHeight !== 0;

          if (isLoaded) {
            counter++;
          }

          if (counter >= img_elements.length) {
            resolve(true);
          }

          imgElem.addEventListener("load", (e) => {
            counter++;

            if (counter >= img_elements.length) {
              resolve(true);
            }
          });
        });

        // 画像の読み込みが完了しない場合の対策
        setTimeout(() => {
          resolve(true);
        }, 20000);
      });
    }

    setTimeout(() => {
      this.run();
      document.documentElement.classList.remove("is-transition");
    }, 200);
  }

  run() {
    // イベントの発火
    scrollTo(0, 0);

    document.body.dispatchEvent(this.event);
  }

  _setVisited() {
    sessionStorage.setItem("isVisited", true);
    this._getVisited();
  }

  _getVisited() {
    this.isVisited = !!sessionStorage.getItem("isVisited");
  }

  // オープニング
  _checkIos() {
    const isIos = /iP(hone|(o|a)d)/.test(navigator.userAgent) || (/iPad|Macintosh/i.test(navigator.userAgent) && "ontouchend" in document);

    if (isIos) {
      this.targetElem.classList.add("is-ios");
    }
  }

  _resize() {
    this.targetElem.classList.add("is-resize");
    clearTimeout(this.resizeTimeoutId);

    this.resizeTimeoutId = setTimeout(() => {
      this.targetElem.classList.remove("is-resize");
    }, 500);
  }
}
