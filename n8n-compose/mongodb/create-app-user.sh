# docker-entrypoint-initdb.d/create-app-user.sh

set -e
mongo <<EOF
use admin

db.createUser({
	user: '$MONGO_APP_USER',
	pwd: '$MONGO_APP_PASS',
	roles: [{ 
		role: 'readWrite', 
		db: '$MONGO_INITDB_DATABASE'
	}]
})

use cocktails
db.createCollection("cocktails")
EOF
