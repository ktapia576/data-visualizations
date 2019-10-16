const loadFile = () => { 
  const csvFile = document.getElementById("loadFile").files[0];   // get first file only
  console.log(csvFile);

  //console.log(navigator.deviceMemory);  // Only works on Chrome

  // Parse local CSV file
  Papa.parse(csvFile, {
    complete: results => { console.log("Finished:", results.data); }, // Callback to execute when parsing complete
    error: error => { console.log(error); } // Callback to execute if FileReader encounters an error.
  });
}

$( "#loadFileBtn" ).click( e => {  // add event listener to <a> element
  $( "#loadFile" ).trigger("click");     // activate event handler on #loadcsv
});

  
$( "#loadFile" ).click( e => {   // add event listener to <input type="file"> element
  e.stopPropagation();    // stop bubbling from occuring
});

$("#loadFile").change( e => {  // when value of input changes (once user uploads file), do this [change event is sent to an element when its value changes]
  loadFile();
});