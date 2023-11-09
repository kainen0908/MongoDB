db.users.drop()
for (i=0; i< 100000; i++) {
  db.users.insertOne({
    i:i,
    username:"user"+i,
    age:Math.floor(Math.random()*120),
    created:new Date()
  })
}
db.users.find().limit(10)

db.users.find({username:"user101"}).explain("executionStats")
db.users.createIndex({username:1})
db.users.find({username:"user101"}).explain("executionStats")
db.users.find({username:"user99999"}).explain("executionStats")
db.users.getIndexes()
db.users.find().sort({age:1, username:1})
db.users.find({},{_id:0, i:0, created:0})
db.users.find({},{_id:0, i:0, created:0}).explain("executionStats")
db.users.createIndex({age:1, username:1})
db.users.getIndexes()
db.users.find({},{_id:0, i:0, created:0}).explain("executionStats")
db.users.dropIndex({age:1, username:1})
db.users.getIndexes()
db.users.find({age:21}).sort({username:1}).explain("executionStats")
db.users.dropIndex({username:1})
db.users.getIndexes()
db.users.find({age:21}).sort({username:1}).explain("executionStats")
db.users.createIndex({age:1, username:1})
db.users.getIndexes()
db.users.find({age:21}).sort({username:1}).explain("executionStats")
db.users.find({age:{$gte:21, $lte:30}}).explain("executionStats")
db.users.dropIndex({age:1, username:1})
db.users.find({age:{$gte:21, $lte:30}}).explain("executionStats")
db.users.createIndex({username:1})
db.users.find({age:{$gte:21, $lte:30}}).explain("executionStats")
db.users.find({age:{$gte:21, $lte:30}}).sort({username:1}).explain("executionStats")
db.users.createIndex({age:1,username:1})
db.users.find({age:{$gte:21, $lte:30}}).sort({username:1}).explain("executionStats")
db.users.find({age:{$gte:21, $lte:30}}).sort({username:1}).hint({age:1, username:1}).explain("executionStats")
db.users.find({age:{$gte:21, $lte:30}}).sort({username:-1}).explain("executionStats")
db.users.find({age:{$gte:21, $lte:30}}).sort({username:-1}).hint({age:1, username:1}).explain("executionStats")

db.students.drop()
for(i=0; i<100000; i++) {
  db.students.insertOne({
    student_id:i,
    scores_id:Math.floor(Math.random()*500),
    final_grade:Math.floor(Math.random()*10)
  })
}
db.students.createIndex({class_id:1})
db.students.createIndex({student_id:1, class_id:1})
db.students.getIndexes()
db.students.find({student_id:{$gt:50000}, class_id:54}).sort({student_id:1}).explain("executionStats")
db.students.find({student_id:{$gt:50000}, class_id:54}).sort({student_id:1}).hint({student_id:1, class_id:1}).explain("executionStats")
db.students.createIndex({class_id:1, student_id:1})
db.students.getIndexes()
db.students.find({student_id:{$gt:50000}, class_id:54}).sort({student_id:1}).explain("executionStats")
db.students.find({student_id:{$gt:50000}, class_id:54}).sort({final_grade:1}).explain("executionStats")
db.students.createIndex({class_id:1, final_grade:1, student_id:1})
db.students.find({student_id:{$gt:50000}, class_id:54}).sort({final_grade:1}).explain("executionStats")
db.students.find({student_id:{$gt:50000}, class_id:54}).sort({final_grade:1}).hint({class_id:1, final_grade:1, student_id:1}).explain("executionStats")

db.users.createIndex({age:1})
db.users.createIndex({age:-1}) // 위와 동등

db.users.createIndex({age:1, username:1})
db.users.createIndex({age:1, username:-1}) // 위와 같지 않음
db.users.createIndex({age:-1, username:-1}) // 첫번째와 동등
db.users.createIndex({age:-1, username:1}) // 두번째와 동등

db.students.find({student_id:{$gt:50000}}, {class_id:54, _id:0}).explain("executionStats")
/*
{a:1, b:1, c:1, d:1} // 라고 인덱스를 생성하면 
{a:1} // 위에 포함
{a:1, b:1} // 위에 포함
{a:1, b:1, c:1} // 동일
{a:1, b:-1} // 포함되지 않음
{b:1} // 포함되지 않음
{a:1, c:1} // 포함되지 않음
*/

db.example.drop()
for(j=0; j<1000; j++){
  db.example.insertOne({
    i:Math.floor(Math.random()*1000),
    num:j
  });
}
db.example.find()
db.example.createIndex({i:1})
db.example.find({i:{$ne:3}}).explain("executionStats")
db.example.find({i:{$not:{$lt:500}}}).explain("executionStats")
db.example.find({i:{$nin:[3,5,7]}}).explain("executionStats")

db.users.getIndexes()
db.users.find({age:47, username:{$gt:"user5",$lt:"user8"}}).explain("executionStats")
db.users.dropIndex({age:1, username:1})
db.users.createIndex({username:1, age:1})
db.users.getIndexes()
db.users.find({age:47, username:{$gt:"user5",$lt:"user8"}}).explain("executionStats")

db.foo.drop()
for(j=0; j<1000;j++){
  db.foo.insertOne({
    x:Math.floor(Math.random()*1000),
    y:Math.floor(Math.random()*1000)
  })
}
db.foo.find().limit(10)
db.foo.createIndex({x:1})
db.foo.createIndex({y:1})
db.foo.getIndexes()
db.foo.find({$or:[{x:123}, {y:456}]})
db.foo.find({$or:[{x:123}, {y:456}]}).explain("executionStats")

db.foo.find({$or:[{x:1},{x:2}]})
db.foo.find({x:{$in:[1,2]}}) // or보다는 in 연산자를 사용할 것

db.foo.find({$or:[{x:{$ne:1}},{x:{$ne:2}}]}) // 안좋은 쿼리
db.foo.find({x:{$nin:[1,2]}}) // 중복제거하느라 시간낭비를 하지 않음.


db.employees.getIndexes()
db.employees.createIndex({ename:1})
db.employees.getIndexes()

db.employees.reIndex()
db.employees.getIndexes()
db.runCommand({reIndex:"employees"})

db.employees.createIndex({empno:1}, {unique:true})
db.employees.insert({empno:7370 , ename : "SMAT", job : "CLERK", manager : "FORD", hiredate : "17-12-1980", sal : 800, deptno : 20 }) 
db.employees.getIndexes()
db.employees.dropIndex({empno:1})
db.employees.insert({empno:7369 , ename : "SMAT", job : "CLERK", manager : "FORD", hiredate : "17-12-1980", sal : 800, deptno : 20 }) 
db.employees.createIndex({empno:1}, {unique:true}) // 에러: 중복 항목이 있는 키는 고유인덱스로 지정불가.
db.employees.find({empno:7369})
db.employees.find()
db.employees.createIndex(({comm:1},{sparse:true}))
db.employees.getIndexes()
db.employees.find({comm:300}).pretty()
db.employees.find({comm:300}).explain()
db.employees.createIndex({deptno:1, ename:1},{partialFilterExpression:{sal:{$gte:2500}}})
db.employees.find({deptno:10, sal:{$gte:2500}}).pretty()
db.employees.find({deptno:10, sal:{$gte:2500}}).explain()
db.employees.find({deptno:10, sal:{$gte:2000}}).explain()
db.employees.find({deptno:10, sal:{$gte:3000}}).explain()

db.users.createIndex({email:1},{unique:true, partialFilterExpression:{email:{$exists:true}}})

db.employees.createIndex({hiredate:1}, {background:true})// background로 인덱스 생성작업을 수행
db.employees.getIndexes()







