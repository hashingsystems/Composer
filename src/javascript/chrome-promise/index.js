function tabsQuery(q) {
    return new Promise(resolve => {
        chrome.tabs.query(q, tabs => resolve(tabs))
    })
}

// url is a url.origin
// name is the name of the cookie
// a Promise for the cookie will be returned.
// User of this function will have to retrieve cookie and cookie.value separately.
// e.g.
// let cookie = await cookiesGet(url.origin, 'micropaymentID')
// log(cookie)
// log(cookie.value)
function cookiesGet(url, name, callback) {
    return new Promise((resolve, reject) => {
        chrome.cookies.get({ url, name }, cookie => {
            if (cookie !== undefined) {
                resolve(cookie)
            } else {
                reject(new Error('no cookie for you'))
            }
        })
    })
}

export { tabsQuery, cookiesGet }
