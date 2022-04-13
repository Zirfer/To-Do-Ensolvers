require('dotenv').config();

const app = require('./app')
require('./db');

// Starting the server
async function main() {
    await app.listen(app.get('port'), () => {
        console.log('Server on port ' + app.get('port'));
    });
}

main();
