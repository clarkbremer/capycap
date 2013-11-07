
function copyToClipboard (text) {
  console.log(text);
  alert('Check your console for all the output');
}


function initContentScript() {

  document.addEventListener('mousedown', function(evt) {
    // alert("botton down");
    if (event.altKey) {
        var form_id = $('form').attr('id');

        var copyToClipboardText = "";
        $('#' + form_id + " *").filter(':input').each(function(){

            // do not worry about diabled fields skip them
            if (!$('#' + this.id).is(':disabled')) {
              if (this.type == 'text' && this.value != '') {
                  copyToClipboardText += "fill_in '" + this.id + "', :with => '" + this.value + "'" + "\n";
              };

              if (this.type == 'radio') {
                  copyToClipboardText += "choose '" + this.id + "'" + "\n";
              };

              if (this.type == 'checkbox') {
                  if ($('#' + this.id).is(':checked')) {
                      copyToClipboardText += "check '" + this.id + "'" + "\n";
                  } else {
                      copyToClipboardText += "uncheck '" + this.id + "'" + "\n";
                  }
              };
            }
        });

        copyToClipboard(copyToClipboardText);
    };  
  }, false);
}

initContentScript();

