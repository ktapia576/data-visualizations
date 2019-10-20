google.charts.load('current', {'packages':['table']}); // Load google charts

const drawTable = (data, headers) => {
  var tableData = new google.visualization.DataTable();

  headers.forEach( item => { tableData.addColumn('string',item);} );   //Create Columns

  data.forEach( row => { tableData.addRow(row);} );   //Add rows

  var table = new google.visualization.Table(document.getElementById('table-display'));

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
  document.getElementById('id01').style.display='block'; // show login modal
});

$("#login").click( e => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "src/login.php",
    data: {
      username: $("#username").val(),
      password: $("#password").val()
    },
    success: function(result) {
      var cookies = Cookies.get(); // get object of all cookies
      document.getElementById('welcome-msg').textContent = "Welcome, "+cookies.username;
      console.log("success");
      document.getElementById("graph-display-msg").textContent = result.message;
      console.log(result);
    },
    error: function(result) {
      var message = result.responseJSON.message;
      console.log("error");
      document.getElementById("graph-display-msg").textContent = message;
      console.log(result);
    }
  });
});

$('#logoutBtn').click( e => {
  e.preventDefault(); // default action of an element from happening 

  // Remove all cookies
  Cookies.remove("name"); 
  Cookies.remove("gender"); 
  Cookies.remove("uid"); 
  Cookies.remove("username"); 

  document.getElementById('welcome-msg').textContent = "Logout Successful";  // Display you have been logged out
});

$(document).ready( () => {
  var cookies = Cookies.get(); // get object of all cookies

  // Check if Cookie set
  if (cookies.username == null){ // Check if null and undefined simultaneously
    document.getElementById('welcome-msg').textContent = "Login for more features!";
  } else {
    document.getElementById('welcome-msg').textContent = "Welcome, "+cookies.username;
  }
});

$('#infoBtn').click( e => {
  e.preventDefault(); // default action of an element from happening
  document.getElementById('infoModal').style.display='block'; // show login modal
});

$('#userInfoBtn').click( e => {
  e.preventDefault(); // default action of an element from happening
  var cookies = Cookies.get(); // get object of all cookies

  // Check if Cookie set
  if (cookies.username == null){ // Check if null and undefined simultaneously
    document.getElementById('userInfo').textContent = "Login to see User info!";
  } else {
    var userInfo = `<b>UID:</b> ${cookies.uid}</br>
    <b>Username:</b> ${cookies.username}</br>
    <b>Name:</b> ${cookies.name}</br>
    <b>Gender:</b> ${cookies.gender}</br>`;

    document.getElementById('userInfo').innerHTML = userInfo; // innerHTML returns HTML, textContent has better performance because its value is not parsed as HTML
  }

  document.getElementById('userInfoModal').style.display='block'; // show login modal
});