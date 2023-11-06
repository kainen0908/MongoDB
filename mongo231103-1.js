db
use ex
show dbs
db.createCollection("employees", {capped: true, size:100000})
show collections
db.employees.stats()
db.employees.renameCollection("emp")
db.emp.drop()
m = {ename:"smith"}
n = {empno:1101}
db.things.insert(m)
db.things.insertOne(n)
db.things.find()
db.things.insertOne({empno:1102, ename:"king"})
db.things.find()
for(var n=1103; n<= 1120; n++) db.things.insertOne({n:n, m:"test"})
db.things.find()
db.things.update({n:1103}, {$set:{ename:"stanford", dep:"research"}})
db.things.find({n:1103})
db.things.update({n:1103}, {$set:{dep:"inventory"}})
db.things.find({n:1103})
db.things.remove({m:"test"})
db.things.remove({})
db.things.find()
db.things.drop()
p= {
  eno:1101,
  fname:"adam",
  lname:"kroll",
  job:"manager",
  salary:100000,
  dept_name:"sales"
}
db.emp.insertOne(p)
db.emp.findOne({_id:ObjectId("65444f4d8bcef3c79d3596a8")})
P = {
  "_id":ObjectId("202311030000000000000001"),
  "v_date":ISODate("2023-11-03T10:44:30.255Z"),
  "v_bin":BinData(0, "2faeces232csdceq2424"),
  "v_char":"Lee Sunshin",
  "v_num":1038641858,
  "v_arr":["lee1024@daum.net", "lee1024@naver.com"],
  "v_bignum":NumberLong(125700000000000)
}
db.data_att.insertOne(P)
db.data_att.find()
for(var n=1103; n<=1120; n++) db.things.insertOne({empno:n, ename:"test", sal:1000})
db.things.find()
var cursor = db.things.find()
while(cursor.hasNext()) printjson(cursor.next())
printjson(cursor,next())
var arr = db.things.find().toArray()
arr[17]
arr[0]
x=new Date()
x.toString()
d = ISODate()
d.getYear()
d = ISODate("1923-11-03T02:10:00.225Z")
d.getYear()
d.getMonth()
db.foo.insertOne({x:1, y: new Timestamp()})
db.foo.find()
for(var i=0; i<10; i++) db.foo.insertOne({y: new Timestamp(), x: i})
df.foo.find({}, {_id:0})

function seq_no(name) {
  var ret = db.seq_no.findAndModify({query:{_id:name}, update:{$inc:{next:1}}, "new":true, upsert:true});
  return ret.next;
}

db.order_no.insertOne({_id:seq_no("order_no"), name:"Jimmy"})

db.employees.drop()

db.employees.insert({empno:7369 , ename : "SMITH", job : "CLERK", manager : "FORD", hiredate : "17-12-1980", sal : 800, deptno : 20 }) 
db.employees.insert({empno:7499 , ename : "ALLEN", job : "SALESMAN", manager : "BLAKE", hiredate : "20-02-1981", sal :1600, comm : 300, deptno : 30 })
db.employees.insert({empno:7521 , ename : "WARD", job : "SALESMAN", manager : "BLAKE", hiredate : "22-02-1981", sal : 1250, comm : 500, deptno : 30 })
db.employees.insert({empno:7566 , ename : "JONES", job : "MANAGER", manager : "KING", hiredate : "02-04-1981", sal : 2975, deptno : 20 })
db.employees.insert({empno:7654 , ename : "MARTIN", job : "SALESMAN", manager : "BLAKE", hiredate : "28-09-1981", sal : 1250, comm : 1400, deptno : 30 })
db.employees.insert({empno:7698 , ename : "BLAKE", job : "MANAGER", manager : "KING", hiredate : "01-05-1981", sal : 2850, deptno : 30 })
db.employees.insert({empno:7782 , ename : "CLARK", job : "MANAGER", manager : "KING", hiredate : "09-06-1981", sal : 2450, deptno : 10 })
db.employees.insert({empno:7788 , ename : "SCOTT", job : "ANALYST", manager : "JONES", hiredate : "13-06-1987", sal : 3000, deptno : 20 })
db.employees.insert({empno:7839 , ename : "KING", job : "CEO", manager : "", hiredate : "17-11-1981", sal : 5000, deptno : 10 })
db.employees.insert({empno:7844 , ename : "TURNER", job : "SALESMAN", manager : "BLAKE", hiredate : "08-09-1981", sal : 1500, deptno : 30 }) 
db.employees.insert({empno:7876 , ename : "ADAMS", job : "CLERK", manager : "SCOTT", hiredate : "13-06-1987", sal : 1100, deptno : 20 })
db.employees.insert({empno:7900 , ename : "JAMES", job : "CLERK", manager : "BLAKE", hiredate : "03-12-1981", sal : 950, deptno : 30 })
db.employees.insert({empno:7902 , ename : "FORD", job : "ANALYST", manager : "JONES", hiredate : "03-12-1981", sal : 3000, deptno : 20 })
db.employees.insert({empno:7934 , ename : "CLERK", job : "CLERK", manager : "KING", hiredate : "23-01-1982", sal : 1300, deptno : 10 })

// select * from employees where empno=7369
db.employees.find({empno:7369}).forEach(printjson)
// select ename from employees where empno=7369
db.employees.find({empno:7900}), {ename:1}.forEach(printjson)
// select _id, ename from employees where empno=7369
db.employees.find({empno:7900},{_id:0, ename:1}).forEach(printjson)
// select empno, ename from employees where ename >= 'ALLEN' and ename < 'SCOTT'
db.employees.createIndex({ename:1})
db.employees.find({}, {_id:0, empno:1, ename:1}).min({ename:"ALLEN"}).max({ename:"SCOTT"}).hint({ename:1})
// select empno, ename from employees where empno > 7500 and empno <= 7600
db.employees.find({empno:{$gt:7500, $lte:7600}}, {_id:0, empno:1})
// select empno from employees where empno = 7782 or empno = 7844
db.employees.find({$or:[{empno:7782}, {empno:7844}]}, {_id:0, empno:1})
// select count(*) from employees
// db.employees.count() 사장됨
db.employees.countDocuments()
// select count(*) from employees where empno > 7900
db.employees.find({empno:{'$gt':7900}}).count()
// select distinct deptno from employees
db.employees.distinct("deptno")
// select ename, job from employees where deptno = 10, order by ename desc
db.employees.find({deptno:10}, {_id:0, ename:1, job:1}).sort({ename:-1})
db.employees.find({sal:{$lte:1000}}, {_id:0, empno:1, ename:1})
db.employees.find({sal:{$gte:1500, $lte:5000}}, {_id:0, empno:1, ename:1, sal:1})



db.employees.find({$or:[{deptno:10}, {deptno:30}]}, {_id:0, empno:1, ename:1})
db.employees.find({deptno:{$in:[10,30]}}, {_id:0, empno:1, ename:1}) // 위와 동일

db.employees.find({$and:[{deptno:10}, {sal:{$gt:1000}}]}, {_id:0, empno:1, ename:1})
db.employees.find({comm:{$exists:true}}, {_id:0, empno:1, ename:1, comm:1})
db.employees.find({comm:{$exists:false}}, {_id:0, empno:1, ename:1})

db.employees.find({comm:{$type:16}}, {_id:0, empno:1, ename:1})
db.employees.find({ename:{$type:2}}, {_id:0, empno:1, ename:1})

db.employees.find({ename:{$regex:'S.*H', $options:'i'}}, {empno:1, ename:1})
db.employees.find({ename:{$regex:'s.*h', $options:'i'}}, {empno:1, ename:1})
db.employees.find({ename:{$regex:'S.*H', $options:'m'}}, {empno:1, ename:1})
db.employees.find({ename:{$regex:'s.*h', $options:'m'}}, {empno:1, ename:1})

db.order.drop()
db.order.insert({
  cust_id:"A2023001",
  order_date: new Date("Oct 01, 2012"),
  status: "A",
  price: 250,
  items: [
    {item_name: "Bunny Boots", qty:5, price: 2.5},
    {item_name: "Sky Pole", qty:5, price: 2.5},
  ]
})

db.order.insert({
  cust_id:"A2023001",
  order_date: new Date("Sep 15, 2012"),
  status: "A",
  price: 1125,
  items: [
    {item_name: "Bunny Boots", qty:15, price: 2.5},
    {item_name: "Sky Pole", qty:5, price: 2.5},
  ]
})

db.employees.aggregate([
  {$match:{$and:[{deptno:10}, {sal:{$gte:500, $lte:3000}}]}},
  {$match:{$or:[{job:"CLERK"}, {job:"SALESMAN"}]}},
  {$project: {
    _id:0,
    empno:1,
    lowerEname: {$toLower: "$ename"},
    capitalJob: {$toUpper: "$job"},
    substr_name: {$substr: ["$ename", 1, 2]},
    str_compare: {$strcasecmp: ["$ename", "JMJOO"]},
    sal:1
  }}
]).pretty()


db.employees.aggregate([
  {$match:{deptno:30}},
  {$project: {
    _id:0,
    empno:1,
    ename:1,
    sal:1,
    comm:{$ifNull:["$com", 0]},
    sum_avg_add: {$add:["$sal", {$ifNull:["$comm", 0]}]},
    sum_avg_subtract:{$subtract:["$sal", {$ifNull:["$comm", 0]}]},
    sum_avg_multiply:{$multiply:["$sal",2]},
    sum_avg_divide:{$divide:["$sal",2]}
  }}
]).pretty()

db.employees.aggregate([{
 $project:{
   _id:0,
   empno:1,
   ename:1,
   sal:1,
   comm: {$ifNull:["$com", 0]},
    sum_avg_add: {$add:["$sal", {$ifNull:["$comm", 0]}]},
    sum_avg_subtract:{$subtract:["$sal", {$ifNull:["$comm", 0]}]},
    sum_avg_multiply:{$multiply:["$sal",2]},
    sum_avg_divide:{$divide:["$sal",2]}
 } 
},
{
  $group: {
    _id: 0,
    numTotalAmount:{$sum:1},
    addTotalAmount:{$sum:"$sal"},
    avgTotalAmount:{$avg:"$sal"},
    maxAmount:{$max:"$sal"},
    minAmount:{$min:"$sal"},
    firstEmpno:{$first:"$empno"},
    lastEmpno:{$last:"$empno"},
    addAmount:{$sum:"$sum_avg_add"},
    subtractAmount:{$sum:"$sum_avg_subtract"},
    multiplyAmount:{$sum:"$sum_avg_multiply"},
    divideAmount:{$sum:"$sum_avg_divide"}
  }
}
]).pretty()


//
db.employees.aggregate([
{
  $group: {
    _id: "$deptno",
    numTotalAmount:{$sum:1},
    addTotalAmount:{$sum:"$sal"},
    avgTotalAmount:{$avg:"$sal"},
    maxAmount:{$max:"$sal"},
    minAmount:{$min:"$sal"},
    firstEmpno:{$first:"$empno"},
    lastEmpno:{$last:"$empno"}
  }
}
]).pretty()
//


db.employees.aggregate([
{
  $group: {
    _id: "$deptno",
    enames:{$addToSet:"$ename"}
  }
}
]).pretty()

//

db.employees.aggregate([
  {$match:{deptno:30}},
  {$sort:{empno:1}},
  {$project:{_id:0, empno:1, ename:1}}
]).pretty()
//

db.employees.aggregate([
  {$limit:5},
  {$skip:1},
  {$sort:{empno:1}},
   {$project:{_id:0, empno:1, ename:1}}
]).pretty()
//

db.employees.aggregate([
  {$match:{deptno:30}},
  {$project:{
    _id:0, 
    empno:1, 
    ename:1,
    job:1,
    comm:1,
    condition:{$cond:["$comm", 1, 0]} // $comm ? 1: 0
    }
  }
]).pretty()
//

db.employees.aggregate([
  {$match:{deptno:30}},
  {$project:{
    _id:0, 
    empno:1, 
    ename:1,
    job:1,
    comm:1,
    boolean_condition:{$cond:["$comm", 1, 0]}, // $comm ? 1: 0
    ifNull_condition:{$ifNull:["$comm", 1, 0]}
    }
  }
]).pretty()

/////////////////

db.employees.drop()

db.employees.insert({empno:7369 , ename : "SMITH", job : "CLERK", hiredate : new Date(), sal : 800, deptno : 20 }) 
db.employees.insert({empno:7499 , ename : "ALLEN", job : "SALESMAN", hiredate : new Date(), sal :1600, comm : 300, deptno : 30 })
db.employees.insert({empno:7521 , ename : "WARD", job : "SALESMAN", hiredate : new Date(), sal : 1250, comm : 500, deptno : 30 })
db.employees.insert({empno:7566 , ename : "JONES", job : "MANAGER", hiredate : new Date(), sal : 2975, deptno : 20 })
db.employees.insert({empno:7654 , ename : "MARTIN", job : "SALESMAN", hiredate : new Date(), sal : 1250, comm : 1400, deptno : 30 })
db.employees.insert({empno:7698 , ename : "BLAKE", job : "MANAGER", hiredate : new Date(), sal : 2850, deptno : 30 })
db.employees.insert({empno:7782 , ename : "CLARK", job : "MANAGER", hiredate : new Date(), sal : 2450, deptno : 10 })
db.employees.insert({empno:7788 , ename : "SCOTT", job : "ANALYST", hiredate : new Date(), sal : 3000, deptno : 20 })
db.employees.insert({empno:7839 , ename : "KING", job : "CEO", hiredate : new Date(), sal : 5000, deptno : 10 })
db.employees.insert({empno:7844 , ename : "TURNER", job : "SALESMAN", hiredate : new Date(), sal : 1500, deptno : 30 }) 
db.employees.insert({empno:7876 , ename : "ADAMS", job : "CLERK", hiredate : new Date(), sal : 1100, deptno : 20 })
db.employees.insert({empno:7900 , ename : "JAMES", job : "CLERK", hiredate : new Date(), sal : 950, deptno : 30 })
db.employees.insert({empno:7902 , ename : "FORD", job : "ANALYST", hiredate : new Date(), sal : 3000, deptno : 20 })
db.employees.insert({empno:7934 , ename : "CLERK", job : "CLERK", hiredate : new Date(), sal : 1300, deptno : 10 })
////

db.employees.aggregate([
  {$match:{empno:7782}},
  {$project: {
    _id:0,
    empno:1,
    ename:1,
    year_hiredate:{$year:"$hiredate"},  
    month_hiredate:{$month:"$hiredate"},  
    week_hiredate:{$week:"$hiredate"},  
    hour_hiredate:{$hour:"$hiredate"},  
    minute_hiredate:{$minute:"$hiredate"},  
    second_hiredate:{$second:"$hiredate"}, 
    dayOfYear_hiredate:{$dayOfYear:"$hiredate"},  
    dayOfMonth:{$dayOfMonth:"$hiredate"},  
    dayOfWeek:{$dayOfWeek:"$hiredate"},  
  }}
]).pretty()

//

db.order.drop()
db.order.insert({
  cust_id:"A2023001",
  order_date: new Date("Oct 01, 2012"),
  status: "A",
  price: 250,
  items: [
    {item_name: "Bunny Boots", qty:5, price: 2.5},
    {item_name: "Sky Pole", qty:5, price: 2.5},
  ]
})

db.order.insert({
  cust_id:"A2023001",
  order_date: new Date("Sep 15, 2012"),
  status: "A",
  price: 1125,
  items: [
    {item_name: "Bunny Boots", qty:15, price: 2.5},
    {item_name: "Sky Pole", qty:5, price: 2.5},
  ]
})
db.order.find()

//

var map_function = function() {emit(this.cust_id, this.price);}
var reduce_function = function(keyCustId, valuePrices) {
  return Array.sum(valuePrices);
}
db.order.mapReduce(
  map_function,
  reduce_function,
  {out:"order_cust_total"}
)

db.order_cust_total.find()

var map_function = function() {
  for(var idx = 0; idx < this.items.length; idx++) {
    var key = this.items[idx].item_name;
    var value = {count:1, qty:this.items[idx].qty};
    emit(key, value)
  }
}

var reduce_function = function(keySKU, valuesCountObjects) {
  reducedValue = {count:0, qty:0}
  for(var idx=0; idx < valuesCountObjects.length; idx++) {
    reducedValue.count += valuesCountObjects[idx].count;
    reducedValue.qty += valuesCountObjects[idx].qty;
  }
  return reducedValue;
}

var finalize_function = function(key, reducedValue) {
  reducedValue.average = reducedValue.qty/reducedValue.count;
  return reducedValue;
}

db.order.mapReduce(
  map_function,
  reduce_function,
  {
    out:{merge:"map_reduce_example"},
    query:{order_data:{$gt:new Date('01/01/2012')}},
    finalize:finalize_function()
  }
)

db.map_reduce_example.find()


//

db.log_session.drop()
db.log_session.insertOne({userid:"T2023001", ts:ISODate("2023-01-03 15:07:00"), length:88})
db.log_session.insertOne({userid:"T2023002", ts:ISODate("2023-01-03 15:13:00"), length:10})
db.log_session.insertOne({userid:"T2023003", ts:ISODate("2023-01-03 16:12:00"), length:120})
db.log_session.insertOne({userid:"T2023004", ts:ISODate("2023-01-03 17:35:00"), length:35})
db.log_session.insertOne({userid:"T2023001", ts:ISODate("2023-01-04 12:15:00"), length:125})
db.log_session.insertOne({userid:"T2023002", ts:ISODate("2023-01-04 14:01:00"), length:110})
db.log_session.insertOne({userid:"T2023003", ts:ISODate("2023-01-04 18:50:00"), length:135})
db.log_session.insertOne({userid:"T2023004", ts:ISODate("2023-01-04 19:27:00"), length:85})