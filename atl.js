window.scroll(0, 0);
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
   uuid = localStorage.getItem("uuid");
if (isMobile) {
   JSON.parse(sessionStorage.getItem("download-popup")) ? document.getElementById("download-app")?.classList.add("d-none") : document.getElementById("download-app")?.classList.remove("d-none");
   let e = "";
   "" !== location.search.replace("?", "") ? (e = location.search.replace("?", ""), sessionStorage.setItem("queryParams", e)) : (e = sessionStorage.getItem("queryParams"), e && (navigator.userAgent.match(/iPhone|iPad|iPod/i) && (document.getElementById("app-store-link").href = `https://apps.apple.com/us/app/befiler/id1591792617?${e}`), navigator.userAgent.match(/Android/i) && (document.getElementById("play-store-link").href = `https://play.google.com/store/apps/details?id=arittek.com.befiler&${e}`)))
}

function collapsedHeaderMenu() {
   if (!isMobile) return;
   const e = document.getElementById("navbarSupportedContent");
   e.hasClass("show") ? e.classList.remove("show") : e.classList.add("show")
}

function hoverSubMenu(e, t) {
   if (isMobile) return;
   const n = document.getElementById(e);
   t && !n.src.includes("-active.png") && n.setAttribute("src", `${n.src.replace(".png","-active.png")}`), !t && n.src.includes("-active.png") && n.setAttribute("src", `${n.src.replace("-active.png",".png")}`)
}

function closeDownloadPopup() {
   document.getElementById("download-app").classList.add("d-none"), sessionStorage.setItem("download-popup", JSON.stringify(!0))
}

function acceptCookies() {
   localStorage.setItem("cookies-accepted", JSON.stringify(!0)), document.getElementById("cookies").classList.remove("d-block"), document.getElementById("cookies").classList.add("d-none")
}

function scrollToView(e) {
   document.getElementById(e).scrollIntoView({
      block: "start",
      behavior: "smooth"
   })
}

function openCategory(e, t) {
   const n = document.getElementById(e),
      o = document.getElementById(t);
   o.hasClass("show") && o.classList.remove("show"), n.hasClass("show") ? n.classList.remove("show") : n.classList.add("show")
}
window.addEventListener("load", (() => {
   uuid || localStorage.setItem("uuid", (Date.now().toString(36) + Math.random().toString(36).substr(2)).toString()), pageEvent(""), setTimeout((() => {
      alertNotification();
      JSON.parse(localStorage.getItem("cookies-accepted")) || document.getElementById("cookies") && document.getElementById("cookies").classList.add("d-block")
   }), isMobile ? 3e3 : 0)
})), window.addEventListener("scroll", (() => {
   if (!isMobile) return;
   const e = document.getElementById("socialBtn"),
      t = document.querySelector("#socialLinks").getBoundingClientRect();
   t.top < window.innerHeight && t.bottom >= 0 ? e.classList.add("d-none") : e.classList.remove("d-none")
})), window.addEventListener("click", (e => {
   switch (e.target.tagName) {
      case "A":
      case "BUTTON":
      case "LI":
         this.pageEvent(`Befiler-Dashboard::${e.target.tagName}::${e.target.textContent.substring(0,500)}`);
         break;
      case "IMG":
         this.pageEvent(`Befiler-Dashboard::${e.target.tagName}::${e.target.src.substring(0,500)}`);
         break;
      case "INPUT":
         this.pageEvent(`Befiler-Dashboard::${e.target.tagName}::${e.target.name.substring(0,500)}`);
         break;
      case "SELECT":
         this.pageEvent(`Befiler-Dashboard::${e.target.tagName}::${e.target.value.substring(0,500)}`)
   }
})), Element.prototype.hasClass = function (e) {
   return this.className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(this.className)
};
let popup = [],
   currentPopup = 0;
async function alertNotification() {
   fetch("https://secure.befiler.com/befiler_services_prod/alert-notification/general?deviceId=" + (isMobile ? "3" : "1")).then((e => e.json())).then((function (e) {
      if (0 !== e.code && (e.response?.tickerAlert.forEach((e => {
            document.getElementById("marquee").classList.add("display"), document.getElementById("marquee-inner").innerHTML += `\n                <div class="marquee__inner-msg">\n                <strong>${e.title}: </strong>\n                <span>${e.description}</span>\n                </div>\n                `
         })), popup = e.response.promotionAlert, 0 !== popup.length)) {
         const e = sessionStorage.getItem("popupStatus") === popup[0].id;
         setTimeout((() => {
            e || (document.getElementById("popup").classList.remove("d-none"), sessionStorage.setItem("popupStatus", popup[0]?.id), popupNavigation())
         }), isMobile ? 5e3 : 3e3), 0 !== popup[0]?.documentBean?.length && document.getElementById("popup-navigation").classList.remove("d-none")
      }
   }))
}

function closePopup() {
   document.getElementById("popup").classList.add("d-none")
}

function popupNavigation(e) {
   switch (document.getElementById("popup-next").removeAttribute("disabled"), document.getElementById("popup-prev").removeAttribute("disabled"), e) {
      case "next":
         currentPopup++;
         break;
      case "prev":
         currentPopup--
   }
   currentPopup === popup[0].documentBean.length - 1 && document.getElementById("popup-next").setAttribute("disabled", !0), 0 === currentPopup && document.getElementById("popup-prev").setAttribute("disabled", !0), document.getElementById("popup-body").innerHTML = `\n        <img src="data:image/png;base64,${popup[0].documentBean[currentPopup].base64}"\n            alt="${popup[0].documentBean[currentPopup].description}" class="popup__body-img">\n    `
}

function pageEvent(e) {
   const t = {
      pageUrl: window.location.href,
      uniqueId: localStorage.getItem("uniqueID") ?? "",
      imeiNumber: uuid,
      appVersion: "v0.0.1",
      additionalDetails: e,
      campaignId: new URL(window.location.href).searchParams.get("campaignId"),
      deviceInfo: getDeviceInfo(),
      deviceType: isMobile ? "3" : "1"
   };
   fetch("https://secure.befiler.com/befiler_services_prod/user/activity/details", {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
      },
      body: JSON.stringify(t)
   }).then((e => e.json())).then((e => {
      1 === e.code && t.uniqueId !== e.response && localStorage.setItem("uniqueID", e.response)
   }))
}

function getDeviceInfo() {
   let e, t, n, o = navigator.userAgent,
      s = navigator.appName,
      i = "" + parseFloat(navigator.appVersion); - 1 != (t = o.indexOf("Opera")) ? (s = "Opera", i = o.substring(t + 6), -1 != (t = o.indexOf("Version")) && (i = o.substring(t + 8))) : -1 != (t = o.indexOf("MSIE")) ? (s = "Microsoft Internet Explorer", i = o.substring(t + 5)) : -1 != (t = o.indexOf("Chrome")) ? (s = "Chrome", i = o.substring(t + 7)) : -1 != (t = o.indexOf("Safari")) ? (s = "Safari", i = o.substring(t + 7), -1 != (t = o.indexOf("Version")) && (i = o.substring(t + 8))) : -1 != (t = o.indexOf("Firefox")) ? (s = "Firefox", i = o.substring(t + 8)) : (e = o.lastIndexOf(" ") + 1) < (t = o.lastIndexOf("/")) && (s = o.substring(e, t), i = o.substring(t + 1), s.toLowerCase() == s.toUpperCase() && (s = navigator.appName)), -1 != (n = i.indexOf(";")) && (i = i.substring(0, n)), -1 != (n = i.indexOf(" ")) && (i = i.substring(0, n));
   let a = "Unknown OS";
   return -1 != navigator.appVersion.indexOf("Win") && (a = "Windows"), -1 != navigator.appVersion.indexOf("Mac") && (a = "MacOS"), -1 != navigator.appVersion.indexOf("X11") && (a = "UNIX"), -1 != navigator.appVersion.indexOf("Linux") && (a = "Linux"), `DeviceName:::${s}##OSVersion:::${a}##Model:::${this.isMobile?"Mobile":"Web"} Browser`
}
