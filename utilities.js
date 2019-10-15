const loadFile = () => { 
    console.log('hi');
    var csvFile = document.getElementById("loadcsv").files[0];   // get first file only
    console.log(csvFile);
}

$( "#loadFile" ).click(function( e ) {  // add event listener to <a> element
    $( "#loadcsv" ).trigger("click");     // activate event handler on #loadcsv
  });

  
$( "#loadcsv" ).click(function( e ) {   // add event listener to <input type="file"> element
    e.stopPropagation();    // stop bubbling from occuring
    loadFile();
  });