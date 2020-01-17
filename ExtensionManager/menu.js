(function() {
    const mainSelector = document.getElementById("extensionsList");
    mainSelector.addEventListener(
        "click",
        event => {
            if (event.target.nodeName == "LI") {
                const toggleStatus = `${
                    event.target.className === "on" ? "off" : "on"
                }`;
                const options = {
                    type: toggleStatus,
                    id: event.target.id
                };
                const cb = function() {
                    event.target.className = toggleStatus; //change class on/off
                    toggleStatus == "on"
                        ? chrome.tabs.reload()
                        : event.preventDefault(); //reload if enabled to ON
                };
                chrome.runtime.sendMessage(options, cb);
            }
        },
        false
    );
    chrome.runtime.sendMessage({ type: "getExtList" }, allExtensions => {
        const renderDom = function() {
            let domlist = "";
            for (let i in (all = allExtensions.extList)) {
                let data = all[i];
                let toggleStatus = `${data.status === true ? "on" : "off"}`;
                let icon = `chrome://extension-icon/${data.id}/16/0`;
                domlist += `<li class="${toggleStatus}" id="${data.id}" ><img src="${icon}"/>${data.name}</li>`;
            }
            return domlist;
        };
        mainSelector.innerHTML = `${renderDom()}`;
    });
})();
