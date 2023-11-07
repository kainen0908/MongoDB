db.papers.drop()
db.papers.insertOne({"authors cited":[]})
db.papers.find()
db.papers.updateOne({"authors cited":{$ne:"Richie"}}, {$push:{"authors cited":"Richie"}})
db.papers.find()
db.papers.drop()
db.papers.insertOne({"authors cited":["Richie"]})
db.papers.find()
db.papers.updateOne({"authors cited":{$ne:"Richie"}}, {$push:{"authors cited":"Richie"}})
db.papers.find()
db.papers.drop()
db.papers.insertOne({"authors cited":["John"]})
db.papers.find()
db.papers.updateOne({"authors cited":{$ne:"Richie"}}, {$push:{"authors cited":"Richie"}})
db.papers.find()
db.papers.drop()
db.papers.insertMany([{"authors cited":[]},{"authors cited":["John"]}, {"authors cited":["Richie"]}])
db.papers.find()
db.papers.updateMany({"authors cited":{$ne:"Richie"}}, {$push:{"authors cited":"Richie"}})
db.papers.find()




db.users.drop()
db.users.insertOne({username:"joe", emails:["joe@example.com", "joe@gmail.com", "joe@yahoo.com"]})
db.users.find()
db.users.updateOne({username:"joe"}, {$addToSet:{emails:"joe@gmail.com"}})
db.users.find()
db.users.updateOne({username:"joe"}, {$addToSet:{emails:["joe@php.net", "joe@example.com", "joe@python.org"]}})
db.users.find()

db.users.updateOne({username:"joe"}, {$pop:{emails:1}}) // 마지막 요소 제거
db.users.find()
db.users.updateOne({username:"joe"}, {$pop:{emails:-1}}) // 첫 요소 제거
db.users.find()




db.lists.drop()
db.lists.insertOne({todo:["dishes", "laundry", "dry cleaning", "laundry"]})
db.lists.find()
db.lists.updateOne({}, {$pull:{todo:"laundry"}})
db.lists.find()


db.blog.posts.drop()
db.blog.posts.insertOne({
  content:"...",
  comments:[
    {
      comments:"good post",
      author:"John",
      votes:0
    },
    {
      comments:"I thought it was too short",
      author:"Claire",
      votes:3
    },
    {
      comments:"free watches",
      author:"Alice",
      votes:-5
    },
    {
      comments:"vacation getaway",
      author:"Lynn",
      votes:-7
    }
  ]  
})
db.blog.posts.find()
db.blog.posts.updateOne({_id:ObjectId("65498adfad1adbf9a38fb78e")}, {$inc:{'comments.0.votes':1}})
db.blog.posts.find()
db.blog.posts.updateOne({"comments.author":"John"}, {$set:{"comments.$.author":"Jim"}}) // $: 찾은 요소의 배열 인덱스 값들 반환하는 연산자
db.blog.posts.find()
db.blog.posts.updateOne({},{$set:{"comments.$[elem].hidden":true}}, {arrayFilters:[{"elem.votes":{$lte:-5}}]})
db.blog.posts.find()




db.analytics.drop()
db.analytics.insertOne({url:"/blog"})
db.analytics.find()
db.analytics.updateOne({url:"/blog"}, {$inc:{pageviews:1}})
db.analytics.find()

db.analytics.drop()
db.analytics.insertOne({url:"/blog"})
db.analytics.find()
db.analytics.updateOne({url:"/blog"}, {$inc:{pageviews:1}},{upsert:true}) 
db.analytics.find()

db.analytics.drop()
db.analytics.updateOne({url:"/blog"}, {$inc:{pageviews:1}},{upsert:true}) // 존재하면 업데이트, 없으면 인설트
db.analytics.find()



db.users.drop()
db.users.updateOne({rep:25}, {$inc:{rep:3}}, {upsert:true})
db.users.find()

db.users.drop()
db.users.updateOne({},{$setOnInsert:{createdAt:new Date()}}, {upsert:true})
db.users.find()
db.users.updateOne({},{$setOnInsert:{createdAt:new Date()}}, {upsert:true})
db.users.find()



db.processes.drop()
db.processes.insertOne({status:"READY", priority:1})
db.processes.insertOne({status:"READY", priority:2})
db.processes.find()


var ps = db.processes.findOneAndUpdate({status:"READY"},{$set:{status:"RUNNING"}},{sort:{priority:-1}, returnNewDocument:true})
print(ps)
db.processes.find()




db.raffle.drop()
db.raffle.insertMany([
  {ticket_no:123},
  {ticket_no:456},
  {ticket_no:542},
  {ticket_no:725}
])
db.raffle.find()
db.raffle.find({ticket_no:{$nin:[725, 542, 390]}})



db.users.drop()
for(i = 1; i <10 ; i++) db.users.insertOne({"id_num":i})
db.users.find()
db.users.find({id_num:{$mod:[5, 1]}})
db.users.find({id_num:{$not:{$mod:[5, 1]}}})



db.c.drop()
db.c.insertMany([
  {y:null},
  {y:1},
  {y:2}
])
db.c.find()
db.c.find({y:null})
db.c.find({z:null})
db.c.insertOne({z:null})
db.c.insertOne({z:1})
db.c.find()
db.c.find({z:null})
db.c.find({z:{$eq:null, $exists:true}})


db.users.drop()
db.users.insertMany([
  {name:"Jo"},
  {name:"Joe"},
  {name:"Joet"},
  {name:"enJoe"}
])
db.users.find()
db.users.find({name:{$regex:/joe/i}}) // i 대소문자 가리지 않음 (ignore case)



db.food.drop()
db.food.insertOne({fruit:["apple", "banana", "peach"]})
db.food.insertOne({fruit:["apple", "kumquat", "orange"]})
db.food.insertOne({fruit:["cherry", "banana", "apple"]})
db.food.find({fruit:{$size:3}})
db.food.insertOne({fruit:["melon", "banana"]})
db.food.update({fruit:{$size:2}}, {$push:{fruit:"strawberry"}})
db.food.update({fruit:{$size:{$gt:2}}},{$push:{fruit:"strawberry"}}) // 에러: $size 연산자는 $gt, $lt 등 비교연산자와 연동 불가



db.food.drop()
db.food.insertOne({fruit:["apple", "banana", "peach"],size:3})
db.food.insertOne({fruit:["apple", "kumquat", "orange"], size:3})
db.food.insertOne({fruit:["cherry", "banana", "apple"], size:3})
db.food.insertOne({fruit:["melon", "banana"], size:2})
db.food.updateOne({size:{$lt:3}},{$push:{fruit:"strawberry"},$inc:{size:1}})
db.food.find()



db.test.drop()
db.test.insertMany([
  {x:5},
  {x:15},
  {x:25},
  {x:[5, 20, 25]}
])
db.test.find()
db.test.find({x:{$gt:10, $lt:20}})
db.test.find({x:{$elemMatch:{$gt:10, $lt:20}}})

// min <= x < max
db.test.createIndex({x:1})
db.test.find({x:{$gt:10, $lt:20}}).min({x:11}).max({x:20}).hint({x:1})


db.people.drop()
db.people.insertOne({
  name:{first:"Joe", last:"Schmoe"},
  age:45
})
db.people.find()
db.people.find({name:{first:"Joe", last:"Schmoe"}}) // 작동은 하나 바람직하지 않음
db.people.find({name:{last:"Schmoe", first:"Joe"}}) // 순서를 바꾸면 매칭 실패
db.people.find({"name.first": "Joe", "name.last":"Schmoe"}) // 바람직한 방법
db.people.find({"name.last": "Schmoe", "name.first":"Joe"}) // 순서에 무관



db.blog.drop()
db.blog.insertOne({
  content:"...",
  comments:[
    {
      author:"joe",
      score:3,
      comment:"nice post"
    },
   {
      author:"mary",
      score:6,
      comment:"terrible post"
    }
  ]
})
db.blog.find()
db.blog.find({comments:{$elemMatch:{author:"joe", score:{$lte:5}}}})



db.foo.drop()
db.foo.insertOne({apple:1, banana:6, peach:3})
db.foo.insertOne({apple:1, spinach:4, watermelon:4})
var cursor = db.foo.find({$where:function(){
  for(var current in this) {
    for(var other in this) {
      if(current != other && this[current]==this[other])
      return true;
    }
  }
  return false;
}})

while(cursor.hasNext())
  printjson(cursor.next());


db.collection.drop()
for(i=0; i <100; i++) {db.collection.insertOne({x:i})}
var cursor = db.collection.find()
while(cursor.hasNext()) {
  printjson(cursor.next())
}

/*
바람직하지 않은 random 뽑기
var total = db.foo.count()
var random = Math.floor(Math.random()*total)
cursor = db.foo.find().skip(random).limit(10)
*/

db.people.drop()
db.people.insertOne({name:"joe", random:Math.random()})
db.people.insertOne({name:"john", random:Math.random()})
db.people.insertOne({name:"jim", random:Math.random()})
db.people.find()

function selectRandom() {
  var random = Math.random()
  result = db.people.findOne({random:{$gt:random}})
  if(result === null) {
    result = db.people.findOne({random:{$lt:random}})  
  }
  return result;
}

printjson(selectRandom())





