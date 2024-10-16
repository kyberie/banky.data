var fs = require('fs');
var date = new Date();
const archiver = require('archiver');


fs.readFile('main/data.json', (err, data) => {
  let banky = JSON.parse(data);
  let zip_name_all = banky.logos_zip_file_all;
  let zip_name_domov = banky.logos_zip_file_domov;

  var outputAll = fs.createWriteStream('main/' + zip_name_all);
  var archiveAll = archiver('zip', {
    zlib: { level: 9 } 
  });
  archiveAll.pipe(outputAll);

  var outputDomov = fs.createWriteStream('main/' + zip_name_domov);
  var archiveDomov = archiver('zip', {
    zlib: { level: 9 } 
  });
  archiveDomov.pipe(outputDomov);

  var logos = [];
  var logosDomov = [];
  for (index in banky.banks) {
    var bank = banky.banks[index];
    if (logos[bank.logo] != 1) {
      archiveAll.file('main/logo/' + bank.logo, { name: bank.logo });
      logos[bank.logo] = 1;
    }
	
	if (bank.app_domov.use_in_app) {
      if (logosDomov[bank.logo] != 1) {
        archiveDomov.file('main/logo/' + bank.logo, { name: bank.logo });
        logosDomov[bank.logo] = 1;
      }
    }

  //  console.log(bank.logo);
  }

  archiveAll.finalize();
  archiveAuto.finalize();
  archiveDomov.finalize();
});

fs.writeFile('main/update.json', '{"update":"' + date.toISOString() + '"}', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});