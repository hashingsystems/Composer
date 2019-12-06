import setDevEnvironment from './environment'

document.addEventListener('DOMContentLoaded', async function() {
    await setDevEnvironment('all:account-begin')
    let getI18nMsg = chrome.i18n.getMessage
    document.getElementById('title').innerHTML = getI18nMsg('getting_started')
    document.getElementById('portal').innerHTML = getI18nMsg('go_to_portal')
    document.getElementById('portalLink').innerHTML = getI18nMsg('portal_link')

    document.getElementById("checklabel01").getElementsByClassName("checklist__title")[0].innerHTML = getI18nMsg('checklist1');
    document.getElementById("checklabel02").getElementsByClassName("checklist__title")[0].innerHTML = getI18nMsg('checklist2');
    document.getElementById("checklabel03").getElementsByClassName("checklist__title")[0].innerHTML = getI18nMsg('checklist3');
    document.getElementById("checklabel04").getElementsByClassName("checklist__title")[0].innerHTML = getI18nMsg('checklist4');
    document.getElementById("checklabel05").getElementsByClassName("checklist__title")[0].innerHTML = getI18nMsg('checklist5');

    let pairingButton = document.getElementById('pair')
    pairingButton.innerHTML = getI18nMsg('pair_a_device')
    pairingButton.onclick = function(e) {
         e.preventDefault()
        // only if all checkbox buttons are picked!
        if(
        document.getElementById("checkbox01").checked &&
        document.getElementById("checkbox02").checked &&
        document.getElementById("checkbox03").checked &&
        document.getElementById("checkbox04").checked &&
        document.getElementById("checkbox05").checked
        ){
            window.location.href = 'account-link.html'
        }else{
        if(!document.getElementById("checkbox01").checked){
            document.getElementById("checklabel01").classList.add("error");
        }
        if(!document.getElementById("checkbox02").checked){
            document.getElementById("checklabel02").classList.add("error");
        }
        if(!document.getElementById("checkbox03").checked){
            document.getElementById("checklabel03").classList.add("error");
        }
        if(!document.getElementById("checkbox04").checked){
            document.getElementById("checklabel04").classList.add("error");
        }
        if(!document.getElementById("checkbox05").checked){
            document.getElementById("checklabel05").classList.add("error");
        }


        }
    }
    document.getElementById('portalLink').onclick = function() {
        chrome.tabs.create({ url: 'https://portal.hedera.com' })
    }
})
