google.charts.load('current', {'packages':['table']}); // Load google charts

const drawTable = (data, headers) => {
  var tableData = new google.visualization.DataTable();

  headers.forEach( item => { tableData.addColumn('string',item);} );   //Create Columns

  data.forEach( row => { tableData.addRow(row);} );   //Add rows

  var table = new google.visualization.Table(document.getElementById('graph-display'));

  table.draw(tableData, {showRowNumber: true, width: '100%', height: '100%'});
}

const loadFile = () => { 
  var data, memory, headers, browser = navigator.userAgent;  // Get user's browser
  const csvFile = document.getElementById("loadFile").files[0];   // get first file only
  console.log(csvFile);
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
    skipEmptyLines: true, //  lines that are completely empty will be skipped
    complete: results => {  // Callback to execute when parsing complete
      console.log("Finished:", results); 
      data = results.data;
      headers = data.shift(); // returns first row, which are headers, and then removes it from array
      console.log("Headers:", headers); 
      console.log("Data:", data);  // Get a record: data[0].Zipcode | where data[n'th item]."header"
      document.getElementById("graph-display-msg").textContent = JSON.stringify(data);
      drawTable(data,headers);
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

$('#loginBtn').click( e => {
  e.preventDefault(); // default action of an element from happening
  $.ajax({
    type: "POST",
    url: "login.php",
    data: {
        username: $("#username").val(),
        password: $("#password").val()
    },
    success: function(result) {
        
    },
    error: function(result) {
        alert(result);
    }
  });
});