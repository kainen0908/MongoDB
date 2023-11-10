db
use admin
show users
db.createUser({user:"system", pwd:"manager", roles:["dbAdminAnyDatabase"]})
show users
db.dropUser("system")
show users
db.createUser({
  user:"system", 
  pwd:"manager",
  roles:[
    {role:"readWrite", db:"admin"},
    {role:"readWrite", db:"test"},
    {role:"userAdmin", db:"admin"},
    {role:"dbAdmin", db:"admin"},
    {role:"clusterAdmin", db:"admin"},
    {role:"dbAdminAnyDatabase", db:"admin"}
  ]
})
show users
