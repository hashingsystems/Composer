/* Usage example
  (async() => {
    await setLocalStorage({ aaa: 1, bbb: 2 });

    let aaa = await getLocalStorage("aaa");
    let bbb = await getLocalStorage("bbb");
    let all = await getLocalStorage();

    log(aaa);// 1
    log(bbb);// 2
    log(all);// {aaa: 1, bbb: 2}
  })();
*/

/**
 *
 * @param {Object} obj
 */
function setLocalStorage(obj) {
    return new Promise(resolve => {
        chrome.storage.local.set(obj, () => resolve())
    })
}

/**
 *
 * @param {*} key
 */
function getLocalStorage(key = null) {
    return new Promise(resolve => {
        chrome.storage.local.get(key, item => {
            key ? resolve(item[key]) : resolve(item)
        })
    })
}

/**
 *
 * @param {string} key
 */
function removeLocalStorage(key) {
    return new Promise(resolve => {
        chrome.storage.local.remove(key, () => resolve())
    })
}

export { setLocalStorage, getLocalStorage, removeLocalStorage }
