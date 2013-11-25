
function copyToClipboard (text) {
  window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);
}


function copyAllToClipboard() {
  var copyToClipboardText = "";

  $('form').each(function() {
    var form_id = $(this).attr('id');

    $('#' + form_id + " *").filter(':input').each(function(){
        // do not worry about diabled fields skip them
        if (!$('#' + this.id).is(':disabled')) {
          if (this.type == 'text' && this.value != '') {
              copyToClipboardText += "fill_in '" + this.id + "', :with => '" + this.value + "'" + "\n";
          };

          if (this.type == 'radio' && $('#' + this.id).is(':checked')) {
              copyToClipboardText += "choose '" + this.id + "'" + "\n";
          };

          if (this.type == 'checkbox') {
              if ($('#' + this.id).is(':checked')) {
                  copyToClipboardText += "check '" + this.id + "'" + "\n";
              } else {
                  copyToClipboardText += "uncheck '" + this.id + "'" + "\n";
              }
          };

          if (this.type == 'select-one') {
            if ($('#' + this.id).val() != '') {
              copyToClipboardText += "select('" + $('#' + this.id + ' option:selected').text() + "', :from => '" + this.id + "')" + "\n";
            }
          }
        }
    });
  });

  console.log(copyToClipboardText);
  alert('Check your console for all the output');
}

function initContentScript() {
  document.addEventListener('mousedown', function(evt) {
    // alert("botton down");
    if (event.altKey){
        var el = event.target;
        if (event.shiftKey) {
            if (el.nodeName == "INPUT") {
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
            } else {
              copyAllToClipboard();
            }
        }else{
            if (el.nodeName == "INPUT") {
              copyToClipboard(el.id);
            } else {
              copyAllToClipboard();
            }
        };
    };  
  }, false);
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.cmd == "scrape"){
        copyAllToClipboard();
      }
  });

}

initContentScript();

