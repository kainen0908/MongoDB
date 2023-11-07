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


