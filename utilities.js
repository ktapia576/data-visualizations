const loadFile = () => { 
    document.getElementById('loadcsv').click(); // open file explorer to choose file
    console.log('hi');

}

document.getElementById('loadFile').addEventListener('click', loadFile);    // add onclick listener for loadfile button