window.RufflePlayer = window.RufflePlayer || {};
                    window.RufflePlayer.config = {
                    "warnOnUnsupportedContent": false, 
                    "autoplay": "on", 
                 };

document.write(new Date().getFullYear())

window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Y9M96QSRZ8');

(function () {

  var target = new Date('2026-04-20T00:00:00');
  if (Date.now() >= target.getTime()) return;

  var ticker = null;
  var escHandler = null;

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function getTimeLeft() {
    var diff = target.getTime() - Date.now();
    if (diff <= 0) return null;

    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000)
    };
  }

  function formatClock(t) {
    return (
      '<div class="ms-unit">' +
        '<span class="ms-num">' + pad(t.d) + '</span>' +
        '<span class="ms-label">DAYS</span>' +
      '</div>' +
      '<div class="ms-sep">:</div>' +
      '<div class="ms-unit">' +
        '<span class="ms-num">' + pad(t.h) + '</span>' +
        '<span class="ms-label">HRS</span>' +
      '</div>' +
      '<div class="ms-sep">:</div>' +
      '<div class="ms-unit">' +
        '<span class="ms-num">' + pad(t.m) + '</span>' +
        '<span class="ms-label">MIN</span>' +
      '</div>' +
      '<div class="ms-sep">:</div>' +
      '<div class="ms-unit">' +
        '<span class="ms-num">' + pad(t.s) + '</span>' +
        '<span class="ms-label">SEC</span>' +
      '</div>'
    );
  }

  function dismiss() {

    if (ticker) {
      clearInterval(ticker);
      ticker = null;
    }

    if (escHandler) {
      document.removeEventListener('keydown', escHandler);
      escHandler = null;
    }

    var overlay = document.getElementById('ms-teaser');
    if (!overlay) return;

    overlay.classList.add('ms-hide');

    setTimeout(function () {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 260);
  }

  var t = getTimeLeft();
  if (!t) return;

  if (!document.getElementById('ms-teaser-styles')) {
    var style = document.createElement('style');
    style.id = 'ms-teaser-styles';
    style.textContent = [
      '#ms-teaser{position:fixed;inset:0;z-index:999999;background:radial-gradient(circle at center, rgba(0,255,90,.16) 0%, rgba(0,0,0,.84) 30%, rgba(0,0,0,.95) 66%, rgba(0,0,0,.985) 100%);display:flex;align-items:center;justify-content:center;padding:20px;font-family:"Courier New",Courier,monospace;opacity:0;animation:msFadeIn .45s ease forwards;}',
      '#ms-teaser.ms-hide{animation:msFadeOut .24s ease forwards;}',

      '.ms-card{position:relative;width:min(980px,94vw);background:linear-gradient(180deg, rgba(5,8,5,.985), rgba(1,3,1,.995));border:1px solid rgba(0,255,90,.55);box-shadow:0 0 26px rgba(0,255,90,.20),0 0 120px rgba(0,255,90,.13),inset 0 0 60px rgba(0,255,90,.04);overflow:hidden;transform:translateY(16px) scale(.985);animation:msCardIn .45s ease forwards, msBorderPulse 2.8s ease-in-out infinite;}',
      '.ms-card:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(to bottom, rgba(0,255,70,.05) 0px, rgba(0,255,70,.05) 1px, transparent 2px, transparent 4px);opacity:.13;pointer-events:none;mix-blend-mode:screen;}',
      '.ms-card:after{content:"";position:absolute;left:-30%;top:-55%;width:44%;height:210%;background:linear-gradient(90deg, transparent, rgba(0,255,90,.08), transparent);transform:rotate(12deg);animation:msSweep 4.8s linear infinite;pointer-events:none;}',

      '.ms-noise{position:absolute;inset:0;pointer-events:none;opacity:.06;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\' viewBox=\'0 0 140 140\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'140\' height=\'140\' filter=\'url(%23n)\' opacity=\'.9\'/%3E%3C/svg%3E");mix-blend-mode:screen;}',

      '.ms-head{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid rgba(0,255,90,.18);background:rgba(10,14,10,.9);}',
      '.ms-head-left{display:flex;align-items:center;gap:12px;min-width:0;}',
      '.ms-dots{display:flex;gap:8px;flex:0 0 auto;}',
      '.ms-dot{width:10px;height:10px;border-radius:50%;display:block;}',
      '.ms-dot.red{background:#ff5f57;box-shadow:0 0 12px rgba(255,95,87,.55);}',
      '.ms-dot.dim{background:#344334;}',
      '.ms-titlebar{color:rgba(135,255,165,.82);font-size:14px;letter-spacing:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.ms-close{appearance:none;border:0;background:transparent;color:rgba(135,255,165,.78);font:inherit;font-size:34px;line-height:1;cursor:pointer;padding:0 2px;transition:transform .15s ease, opacity .15s ease, text-shadow .15s ease;text-shadow:0 0 12px rgba(0,255,90,.25);}',
      '.ms-close:hover{opacity:1;transform:scale(1.08);text-shadow:0 0 18px rgba(0,255,90,.42);}',

      '.ms-body{position:relative;z-index:2;padding:28px 30px 30px;}',
      '.ms-alertbar{display:inline-flex;align-items:center;gap:10px;padding:8px 12px;margin-bottom:18px;border:1px solid rgba(255,90,90,.28);background:rgba(255,60,60,.06);color:#ff6a61;font-size:12px;letter-spacing:3px;text-transform:uppercase;box-shadow:0 0 18px rgba(255,70,70,.08);}',
      '.ms-alertdot{width:8px;height:8px;border-radius:50%;background:#ff5a52;box-shadow:0 0 12px rgba(255,90,90,.6);animation:msBlink 1.2s steps(1,end) infinite;}',
      '.ms-meta{font-size:15px;line-height:1.65;color:rgba(100,255,130,.46);margin-bottom:18px;}',
      '.ms-meta .warn{color:#ff6b5f;letter-spacing:3px;opacity:.98;text-shadow:0 0 10px rgba(255,90,90,.2);}',

      '.ms-headline{margin:0 0 10px 0;color:#68ff68;font-size:clamp(42px, 7vw, 92px);line-height:.92;font-weight:700;letter-spacing:5px;text-transform:uppercase;text-shadow:0 0 10px rgba(0,255,90,.38),0 0 28px rgba(0,255,90,.18),0 0 90px rgba(0,255,90,.10);animation:msHeadlineFlicker 4.6s steps(1,end) infinite;transition:transform .18s ease,text-shadow .18s ease;}',
      '.ms-sub{margin:0 0 20px 0;color:rgba(160,255,185,.84);font-size:clamp(15px, 2vw, 24px);letter-spacing:4px;text-transform:uppercase;}',

      '.ms-clock-shell{position:relative;margin:0 0 18px 0;padding:18px 16px 16px;border:1px solid rgba(0,255,90,.28);background:linear-gradient(180deg, rgba(0,0,0,.36), rgba(0,0,0,.74));box-shadow:inset 0 0 30px rgba(0,255,90,.04),0 0 32px rgba(0,255,90,.08);overflow:hidden;}',
      '.ms-clock-shell:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at center, rgba(0,255,90,.10), transparent 62%);pointer-events:none;}',
      '.ms-tminus{position:relative;text-align:center;font-size:12px;letter-spacing:8px;color:rgba(135,255,165,.42);margin-bottom:12px;text-transform:uppercase;}',

      '.ms-clock{position:relative;display:flex;align-items:flex-start;justify-content:center;gap:10px;flex-wrap:nowrap;white-space:nowrap;}',
      '.ms-unit{display:flex;flex-direction:column;align-items:center;flex:0 0 auto;min-width:0;}',
      '.ms-num{display:block;color:#6aff6a;font-size:clamp(34px, 8vw, 112px);line-height:.88;font-weight:700;letter-spacing:1px;text-shadow:0 0 12px rgba(0,255,90,.72),0 0 34px rgba(0,255,90,.32),0 0 72px rgba(0,255,90,.14);animation:msDigitPulse 1.8s ease-in-out infinite;transition:text-shadow .18s ease, transform .18s ease;}',
      '.ms-label{display:block;margin-top:7px;font-size:11px;letter-spacing:4px;color:rgba(140,255,170,.54);text-transform:uppercase;}',
      '.ms-sep{align-self:center;flex:0 0 auto;color:rgba(110,255,140,.35);font-size:clamp(22px, 3vw, 44px);line-height:1;padding-top:8px;text-shadow:0 0 10px rgba(0,255,90,.2);}',

      '.ms-date{margin-top:14px;text-align:center;font-size:11px;letter-spacing:6px;color:rgba(135,255,165,.32);text-transform:uppercase;}',
      '.ms-footerline{margin:0 0 16px 0;color:rgba(120,255,150,.42);font-size:13px;letter-spacing:3px;text-transform:uppercase;}',
      '.ms-actions{display:flex;gap:12px;flex-wrap:wrap;}',
      '.ms-btn{appearance:none;border:1px solid rgba(0,255,90,.28);background:rgba(0,0,0,.22);color:#68ff68;font:inherit;font-size:13px;letter-spacing:4px;text-transform:uppercase;padding:15px 18px;cursor:pointer;transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease, background .15s ease, text-shadow .15s ease;}',
      '.ms-btn:hover{transform:translateY(-1px);border-color:rgba(0,255,90,.46);box-shadow:0 0 20px rgba(0,255,90,.14);background:rgba(0,255,90,.05);text-shadow:0 0 12px rgba(0,255,90,.35);}',
      '.ms-btn.primary{flex:1 1 280px;}',

      '@keyframes msFadeIn{from{opacity:0}to{opacity:1}}',
      '@keyframes msFadeOut{from{opacity:1}to{opacity:0}}',
      '@keyframes msCardIn{to{transform:translateY(0) scale(1)}}',
      '@keyframes msBorderPulse{0%,100%{box-shadow:0 0 26px rgba(0,255,90,.20),0 0 120px rgba(0,255,90,.13),inset 0 0 60px rgba(0,255,90,.04)}50%{box-shadow:0 0 42px rgba(0,255,90,.27),0 0 150px rgba(0,255,90,.18),inset 0 0 70px rgba(0,255,90,.06)}}',
      '@keyframes msSweep{0%{transform:translateX(-180%) rotate(12deg)}100%{transform:translateX(540%) rotate(12deg)}}',
      '@keyframes msBlink{0%,49%,100%{opacity:1}50%,99%{opacity:.35}}',
      '@keyframes msHeadlineFlicker{0%,15%,17%,56%,58%,100%{opacity:1}16%,57%{opacity:.62}}',
      '@keyframes msDigitPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}',

      '@media (max-width: 700px){' +
        '#ms-teaser{padding:14px;}' +
        '.ms-card{width:calc(100vw - 28px);}' +
        '.ms-head{padding:13px 12px;}' +
        '.ms-titlebar{font-size:11px;letter-spacing:1px;}' +
        '.ms-close{font-size:28px;}' +
        '.ms-body{padding:18px 14px 18px;}' +
        '.ms-alertbar{font-size:10px;letter-spacing:2px;padding:7px 10px;margin-bottom:14px;}' +
        '.ms-meta{font-size:12px;line-height:1.55;margin-bottom:14px;}' +
        '.ms-headline{font-size:clamp(34px, 11vw, 56px);letter-spacing:2px;margin-bottom:8px;}' +
        '.ms-sub{font-size:12px;letter-spacing:2px;line-height:1.4;margin-bottom:14px;}' +
        '.ms-clock-shell{padding:14px 8px 12px;margin-bottom:14px;}' +
        '.ms-tminus{font-size:10px;letter-spacing:5px;margin-bottom:10px;}' +
        '.ms-clock{gap:6px;}' +
        '.ms-num{font-size:clamp(24px, 12vw, 48px);letter-spacing:0;line-height:.92;}' +
        '.ms-label{font-size:8px;letter-spacing:2px;margin-top:5px;}' +
        '.ms-sep{font-size:clamp(14px, 4vw, 22px);padding-top:6px;}' +
        '.ms-date{font-size:8px;letter-spacing:3px;line-height:1.4;margin-top:10px;}' +
        '.ms-footerline{font-size:10px;letter-spacing:2px;line-height:1.45;margin-bottom:14px;}' +
        '.ms-btn{width:100%;font-size:11px;letter-spacing:2px;padding:12px 14px;}' +
      '}',

      '@media (max-width: 380px){' +
        '.ms-num{font-size:22px;}' +
        '.ms-sep{font-size:12px;}' +
        '.ms-label{font-size:7px;letter-spacing:1px;}' +
        '.ms-date{letter-spacing:2px;}' +
      '}'
    ].join('');
    document.head.appendChild(style);
  }

  var overlay = document.createElement('div');
  overlay.id = 'ms-teaser';

  overlay.innerHTML =
    '<div class="ms-card" role="dialog" aria-modal="true" aria-label="Meatspin announcement">' +
      '<div class="ms-noise"></div>' +

      '<div class="ms-head">' +
        '<div class="ms-head-left">' +
          '<div class="ms-dots">' +
            '<span class="ms-dot red"></span>' +
            '<span class="ms-dot dim"></span>' +
            '<span class="ms-dot dim"></span>' +
          '</div>' +
          '<div class="ms-titlebar">meatspin.com — event_transmission.exe</div>' +
        '</div>' +
        '<button type="button" class="ms-close" id="ms-x" aria-label="Close">×</button>' +
      '</div>' +

      '<div class="ms-body">' +
        '<div class="ms-alertbar"><span class="ms-alertdot"></span> 04.20.2026 live event approaching</div>' +

        '<div class="ms-meta">' +
          '> uptime: 21 years... still spinning<br>' +
          '> traffic anomaly detected<br>' +
          '> status: <span class="warn">EVENT_INCOMING</span>' +
        '</div>' +

        '<h2 class="ms-headline">21 Years of Spinning</h2>' +
        '<p class="ms-sub">Meatspin Monday // something big is coming</p>' +

        '<div class="ms-clock-shell">' +
          '<div class="ms-tminus">T-Minus</div>' +
          '<div class="ms-clock" id="ms-clock">' + formatClock(t) + '</div>' +
          '<div class="ms-date">04 • 20 • 2026</div>' +
        '</div>' +

        '<div class="ms-footerline">> keep spinning. the signal goes live soon.</div>' +

        '<div class="ms-actions">' +
          '<button type="button" class="ms-btn primary" id="ms-dismiss">Dismiss</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  setTimeout(function () {
    document.body.appendChild(overlay);

    var closeBtn = document.getElementById('ms-x');
    var dismissBtn = document.getElementById('ms-dismiss');
    var headline = overlay.querySelector('.ms-headline');
    var card = overlay.querySelector('.ms-card');

    if (closeBtn) closeBtn.addEventListener('click', dismiss);
    if (dismissBtn) dismissBtn.addEventListener('click', dismiss);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) dismiss();
    });

    escHandler = function (e) {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', escHandler);

    ticker = setInterval(function () {
      var remaining = getTimeLeft();
      var clock = document.getElementById('ms-clock');

      if (!clock) {
        clearInterval(ticker);
        ticker = null;
        return;
      }

      if (!remaining) {
        clearInterval(ticker);
        ticker = null;
        dismiss();
        return;
      }

      clock.innerHTML = formatClock(remaining);

      if (remaining.s === 0 && headline) {
        headline.style.transform = 'scale(1.035)';
        headline.style.textShadow = '0 0 28px #00ff5a, 0 0 80px rgba(0,255,90,.55), 0 0 120px rgba(0,255,90,.22)';
        setTimeout(function () {
          if (!headline) return;
          headline.style.transform = '';
          headline.style.textShadow = '';
        }, 180);
      }

      if ((remaining.s % 15 === 0) && card) {
        card.style.transform = 'scale(1.006)';
        setTimeout(function () {
          if (card) card.style.transform = '';
        }, 110);
      }
    }, 1000);
  }, 4000);
})();
