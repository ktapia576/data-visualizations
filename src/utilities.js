const loadFile = () => { 
  const csvFile = document.getElementById("loadFile").files[0];   // get first file only
  console.log(csvFile);

  var data, memory, browser = navigator.userAgent;  // Get user's browser
  console.log(browser);

  // Check User's Browser
  if (browser.includes("Firefox") === true) {
    console.log("You have Firefox");
  } else if (browser.includes("Chrome") === true){
    console.log("You have Chrome");
    memory = navigator.deviceMemory;  // Only works on Chrome
    console.log("Your RAM:"+memory);  
  } else {
    console.log("You are not using Firefox or Chrome");
  }

  // Parse local CSV file
  Papa.parse(csvFile, {
    delimiter: ",",
    header: true,
    complete: results => {  // Callback to execute when parsing complete
      console.log("Finished:", results); 
      data = results.data;
      console.log("Data:", data); 
      document.getElementById("graph-display-msg").textContent = JSON.stringify(data);
    }, 
    error: error => {   // Callback to execute if FileReader encounters an error.
      console.log(error.message); 
      document.getElementById("graph-display-msg").textContent = error.message;
    } 
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