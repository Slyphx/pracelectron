const fs = require('fs');

fs.readFile('file.txt', 'utf8', function(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data); // This runs after the file is read
});
console.log("Reading file...");
