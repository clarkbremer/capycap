
function copyToClipboard (text) {
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}


function initContentScript() {

  document.addEventListener('mousedown', function(evt) {
    // alert("botton down");
    if (event.altKey){
        var el = event.target;
        if (el.nodeName == "INPUT"){
            if (el.type == 'text'){
                //console.log("fill_in '"+el.id+"', :with => '"+el.value+"'");
                copyToClipboard("fill_in '"+el.id+"', :with => '"+el.value+"'");
            };
            if (el.type == 'radio'){
                //console.log("choose '"+el.id+"'");
                copyToClipboard("choose '"+el.id+"'");
            };
            if (el.type == 'checkbox'){
                if (document.getElementById(el.id).checked){
                    // console.log("check '"+el.id+"'");
                    copyToClipboard("check '"+el.id+"'");
                }else{
                    // console.log("uncheck '"+el.id+"'");
                    copyToClipboard("uncheck '"+el.id+"'");
                }
            };
        };
    };  
  }, false);
}

initContentScript();

