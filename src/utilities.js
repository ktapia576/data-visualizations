const loadFile = () => { 
    console.log('hi');
    var csvFile = document.getElementById("loadFile").files[0];   // get first file only
    console.log(csvFile);
    var data = $.csv.toObjects(csvFile);
    console.log(data);
}

$( "#loadFileBtn" ).click(function( e ) {  // add event listener to <a> element
    $( "#loadFile" ).trigger("click");     // activate event handler on #loadcsv
  });

  
$( "#loadFile" ).click(function( e ) {   // add event listener to <input type="file"> element
    e.stopPropagation();    // stop bubbling from occuring
  });

$("#loadFile").change(function(e){  // when value of input changes (once user uploads file), do this [change event is sent to an element when its value changes]
  alert('File Selected!');
  loadFile();
});