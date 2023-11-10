db
use admin
show users // 차단됨
db.auth("system","manager")
use ex
db.users.find() // 권한 없어 실패
use admin
show users
db.help
db.grantRolesToUser.help
db.grantRolesToUser("system", ["root"])
show users
db.revokeRolesFromUser("system", ["root"])
show users