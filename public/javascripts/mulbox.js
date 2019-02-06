var charLimit = 32;
/* w/o jQuery window.onload=function()
  .ready waits for the DOM to be fully loaded
*/

$(document).ready(function() {
  // inbox key listener
  $("#inbox").on("input", function(event) {
    updateBoxes();
  });

  function updateBoxes() {
    // Remove old mulboxes
    $(".mulboxWrapper").remove();

    var inbox = $("#inbox")[0];
    var input = inbox.value;

    var start = 0;
    var index = 1;
    while (start < input.length) {
      var pager = " (" + index + ")";
      var boxLimit = charLimit - pager.length;
      var subInput = input.substr(start, boxLimit);

      if (start + subInput.length !== input.length) {
        var lastBreak = subInput.lastIndexOf(" ");

        if (lastBreak > -1) {
          subInput = input.substr(start, lastBreak);
          start++;
        }
      }

      addBox(index, subInput + pager);
      index++;
      start += subInput.length;
    }
  }

  // Add box
  function addBox(id, value) {
    // Get unicode id
    var uniId = getUniId(id);

    // Add a box
    $("#mulboxes").append(`
      <div class="mulboxWrapper">
        <textarea readonly class="mulbox" id="` + id + `" maxlength="140" rows="10" cols="30">` + value + `</textarea>
        <button class="btn btnCopy" data-clipboard-action="copy" data-clipboard-target="#`+ uniId +`">
          <i class="fas fa-copy"></i>
        </button>
      </div>`);
  }

  //converts id to base 16 hexadecimal unicode needed for copy function
  function getUniId(id) {
    var idString = String(id);
    var idHex = "";

    for (var i = 0; i < idString.length; ++i) {
      idHex += "\\" + idString.charCodeAt(i).toString(16);
    }

    return idHex;
  }

//Modal 
  var modal = document.getElementById('modal');
  var btnModal = document.getElementById('helpQuestion');
  var span = document.getElementsByClassName('close')[0];

// calls the modal
  btnModal.onclick = function() {
    modal.style.display = "block";
  };

// closes the modal
  span.onclick = function() {
    modal.style.display = 'none';
  }
// If user click outside modal it will close
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
// Slider button style

  var toggle = document.getElementById('toggleBtnWrapper');
  var toggleWrap = document.getElementById('toggleBtnWrapper-2');
  var toggleNumber;

  toggle.addEventListener('click', function() {
    toggleNumber = !toggleNumber;
    if(toggleNumber) {
      toggleWrap.style.clipPath = 'inset(0 0 0 50%)';
      toggleWrap.style.backgroundColor = '#89C623';
      } else {
        toggleWrap.style.clipPath = 'inset(0 50% 0 0)';
        toggleWrap.style.backgroundColor = '#0084b4';
      }
    console.log(toggleNumber);
  });

  var clipboard = new ClipboardJS('.btnCopy');

   
  clipboard.on('success', function(e) {
    console.log(e);
  });

  clipboard.on('error', function(e) {
    console.log(e);
  });


  //function compactMode(){}
  var compactTogId = document.getElementById('inbox');
  var inbox = document.getElementById('inbox')
  var title = document.getElementById('titleWrap')
  var flexWrap = document.getElementById('flexWrap')
  var compactTogBool;

  compactTogId.oninput = function() {
      setTimeout(function(){flexWrap.style.animation = "animateMargin .5s"; title.style.animation= "animateCompact .5s";}, 300);
      setTimeout(function(){flexWrap.style.margin = "0em"; title.style.transform = "translateY(0)";}, 780);
  };
    
  


});