help
db.help
db.emplyoees.help
db.adminCommand({getLog:"global"}) // 현재 DB와 관련된 로그 상태 정보 출력
db.adminCommand({setParameter:1, notablescan:true}) // Collection  전체 스캔시 에러 발생을 유도
db.foo.drop()
db.foo.insert({_id:1, name:false})
db.foo.insert({_id:2, name:false})
db.foo.insert({_id:3, name:false})
db.foo.find()
db.foo.find({name:true}) // 에러남
db.adminCommand({setParameter:1, notablescan:false}) // 에러 발생하지 않도록 복원
db.foo.find({name:true})
db.foo.find({name:true}).explain()
db.foo.runCommand("compact") // 해당 콜렉션에 대한 단편화 제거 및 장애를 고쳐줌
use admin
db.runCommand({fsync:1}) // 메모리와 디스크 상의 데이터 파일에 대한 Sync작업을 수행
db.fsyncLock() // 데이터 파일 백업을 위해 DB LOCK을 설정
db.fsyncUnlock()

db.currentOp() // 현재 DB의 세션 정보 확인
use test
db.foo.validate({full:true}) // 해당 컬렉션의 논리적, 물리적 구조 정보를 출력