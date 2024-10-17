var fs = require('fs');
var date = new Date();
const archiver = require('archiver');


fs.readFile('main/data.json', (err, data) => {
  let banky = JSON.parse(data);
  let zip_name_domov = banky.logos_zip_file_domov;

  var outputDomov = fs.createWriteStream('main/' + zip_name_domov);
  var archiveDomov = archiver('zip', {
    zlib: { level: 9 } 
  });
  archiveDomov.pipe(outputDomov);

  var logosDomov = [];
  for (index in banky.banks) {
    var bank = banky.banks[index];
	
	if (bank.app_domov.use_in_app) {
      if (logosDomov[bank.logo] != 1) {
        archiveDomov.file('main/logo/' + bank.logo, { name: bank.logo });
        logosDomov[bank.logo] = 1;
      }
    }

  //  console.log(bank.logo);
  }

  archiveDomov.finalize();
});

fs.writeFile('main/update.json', '{"update":"' + date.toISOString() + '"}', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});