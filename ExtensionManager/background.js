chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case "getExtList":
      chrome.management.getAll(function(allExtensions) {
        console.log(allExtensions.length);
        const extOnly = allExtensions.filter(ext => {
          return ext.type === "extension";
        });
        const msgOut = extOnly.reduce((result, allExt) => {
          let lean = {
            id: allExt.id,
            name: allExt.shortName,
            status: allExt.enabled
          };
          result.push(lean);
          return result;
        }, []);
        msgOut.sort(function(a, b) {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) { return 1;} else {
            return 0;
          }
        });
        sendResponse({ extList: msgOut });
      });
      break;
    case "on":
      chrome.management.setEnabled(request.id, true);
      sendResponse(true);
      break;
    case "off":
      chrome.management.setEnabled(request.id, false);
      sendResponse(false);
      break;
    default:
      console.log("DEFAULT: ", request);
  }
  return true;
});
