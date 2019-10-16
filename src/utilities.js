const loadFile = () => { 
  var csvFile = document.getElementById("loadFile").files[0];   // get first file only
  console.log(csvFile);
  
  var reader = new FileReader();
  var data;

  reader.readAsText(csvFile);   // result attribute contains the contents of the file as a text string. DOES THIS IN ASYNC FASHION!! (careful for bugs)
  reader.onloadend = function(){  // This event is triggered each time the reading operation is completed (either in success or failure).
    data = reader.result;   // result property returns the file's contents. Only after read operation
    var parsed = Papa.parse(data);
    console.log(parsed);
  }
}

$( "#loadFileBtn" ).click(function( e ) {  // add event listener to <a> element
  $( "#loadFile" ).trigger("click");     // activate event handler on #loadcsv
});

  
$( "#loadFile" ).click(function( e ) {   // add event listener to <input type="file"> element
  e.stopPropagation();    // stop bubbling from occuring
});

$("#loadFile").change(function(e){  // when value of input changes (once user uploads file), do this [change event is sent to an element when its value changes]
  loadFile();
});