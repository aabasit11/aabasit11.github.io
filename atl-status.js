function checkNumber(e) {
    return e.charCode >= 48 && e.charCode <= 57
 }
 
 function findNTN() {
    const e = document.forms.NTNFinder.cnic.value;
    if ("" === e) {
       const e = document.getElementById("errorResponse");
       return e.innerHTML = '<span class="text-danger">Please enter CNIC to continue</span>', void setTimeout((() => e.innerHTML = 'Enter Your National Identity Card <span class="text-danger">NIC</span> Number'), 5e3)
    }
    document.getElementById("loader").classList.remove("fadeOut"), document.forms.NTNFinder.cnic.disabled = !0, document.getElementById("findNTNBtn").disabled = !0, fetch("https://secure.befiler.com/befiler_services_prod/fbr/ntn/inquiry?param=" + e).then((e => e.json())).then((function (e) {
       if (0 === e.code) {
          const e = document.getElementById("errorResponse");
          e.innerHTML = '<span class="text-danger">Record doesn\'t found! Please enter you valid CNIC number</span>', setTimeout((() => e.innerHTML = 'Enter Your National Identity Card <span class="text-danger">NIC</span> Number'), 25e3), document.getElementById("hideOnSuccess").classList.remove("d-none"), document.getElementById("showOnSuccess").classList.add("d-none")
       } else 1 === e.code && (document.getElementById("hideOnSuccess").classList.add("d-none"), document.getElementById("showOnSuccess").classList.remove("d-none"), document.getElementById("errorResponse").innerHTML = 'Enter Your National Identity Card <span class="text-danger">NIC</span> Number', scrollToView("showOnSuccess"), document.getElementById("registrationNo").innerHTML = e.response[0].registrationNo, document.getElementById("referenceNo").innerHTML = e.response[0].referenceNo, document.getElementById("strn").innerHTML = e.response[0].strn || "N/a", document.getElementById("name").innerHTML = e.response[0].name, document.getElementById("category").innerHTML = e.response[0].category, document.getElementById("registeredOn").innerHTML = e.response[0].registeredOn, document.getElementById("taxOffice").innerHTML = e.response[0].taxOffice, document.getElementById("registrationStatus").innerHTML = e.response[0].registrationStatus, document.getElementById("address").innerHTML = e.response[0].address, /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (document.getElementById("ntnInquiryBusinessBeanList").innerHTML = "", e.response[0].ntnInquiryBusinessBeanList && e.response[0].ntnInquiryBusinessBeanList.forEach((e => {
          document.getElementById("ntnInquiryBusinessBeanList").innerHTML += `\n                            <tr>\n                                <td>${e.sr}</td>\n                                <td>${e.businessBranchName}</td>\n                                <td>${e.businessBranchAddress}</td>\n                                <td>${e.principalActivity}</td>\n                            </tr>\n                        `
       }))));
       document.forms.NTNFinder.cnic.disabled = !1, document.getElementById("findNTNBtn").disabled = !1, document.getElementById("loader").classList.add("fadeOut")
    })).catch((e => console.error(e)))
 }
 
 function findATL() {
    const e = document.forms.ATLFinder.cnic.value;
    if ("" === e) {
       const e = document.getElementById("errorResponse");
       return e.innerHTML = '<span class="text-danger">Please enter CNIC to continue</span>', void setTimeout((() => e.innerHTML = 'Enter Your National Identity Card <span class="text-danger">NIC</span> Number'), 5e3)
    }
    document.getElementById("loader").classList.remove("fadeOut"), document.forms.ATLFinder.cnic.disabled = !0, document.getElementById("findATLBtn").disabled = !0;
    var n = new Date;
    const t = n.getDate() + "-" + (n.getMonth() + 1).toString().padStart(2, 0) + "-" + n.getFullYear();
    fetch(`https://secure.befiler.com/befiler_services_prod/fbr/atl/inquiry?registrationNo=${e}&date=${t}`).then((e => e.json())).then((function (e) {
       if (1 === e.code) document.getElementById("hideOnSuccess").classList.add("d-none"), document.getElementById("showOnSuccess").classList.remove("d-none"), document.getElementById("errorResponse").innerHTML = 'Enter Your National Identity Card <span class="text-danger">NIC</span> Number', scrollToView("showOnSuccess"), document.getElementById("registrationNo").innerHTML = e.response.registrationNo, document.getElementById("name").innerHTML = e.response.name, document.getElementById("businessName").innerHTML = e.response.businessName, document.getElementById("filingStatus").innerHTML = e.response.filingStatus, document.getElementById("filingStatusCheckingDate").innerHTML = e.response.filingStatusCheckingDate;
       else {
          const n = document.getElementById("errorResponse");
          n.innerHTML = `<span class="text-danger">${e.message}</span>`, setTimeout((() => n.innerHTML = 'Enter Your National Identity Card <span class="text-danger">NIC</span> Number'), 25e3), document.getElementById("hideOnSuccess").classList.remove("d-none"), document.getElementById("showOnSuccess").classList.add("d-none")
       }
       document.forms.ATLFinder.cnic.disabled = !1, document.getElementById("findATLBtn").disabled = !1, document.getElementById("loader").classList.add("fadeOut")
    })).catch((e => console.error(e)))
 }
 const input = document.getElementById("NTN");
 input.addEventListener("keyup", (function (e) {
    13 === e.keyCode && (e.preventDefault(), "ntn-status" === window.location.href.split("/")[window.location.href.split("/").length - 1] && findNTN(), "atl-status" === window.location.href.split("/")[window.location.href.split("/").length - 1] && findATL())
 }));