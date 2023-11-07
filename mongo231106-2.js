db.movies.drop()
db.movies.insertMany([
  {"title": "E.T"},
  {"title": "Ghostbusters"},
  {"title": "Blade Runner"}
])
db.movies.find()
db.movies.drop()
db.movies.insertMany([
  {_id:0, "title":"Top Gun"},
  {_id:1, "title":"back to the future"},
  {_id:1, "title":"Gremlins"},
  {_id:2, "title":"Aliens"}
])
db.movies.find()


db.movies.drop()
db.movies.insertMany([
  {_id:0, "title":"Top Gun"},
  {_id:1, "title":"back to the future"},
  {_id:1, "title":"Gremlins"},
  {_id:2, "title":"Aliens"}
],
{ordered: false}
)
db.movies.find()


db.movies.drop()
db.movies.insertMany([
  {_id:0, "title":"Top Gun", year:1986},
  {_id:1, "title":"back to the future", year:1985},
  {_id:2, "title":"Sixteen candles", year:1984},
  {_id:3, "title":"The Terminate", year:1984},
  {_id:4, "title":"Scarface", year:1983}
])
db.movies.find()

db.movies.deleteMany({year:1984})
db.movies.find()


db.users.drop()
db.users.insertOne({name: "joe", friends:32, enemies:2})
var joe = db.users.findOne({name:"joe"})
joe
joe.relationships = {friends:joe.friends, enemies:joe.enemies}
joe.username = joe.name
joe
delete joe.friends
delete joe.enemies
delete joe.name
joe
db.users.find()
db.users.replaceOne({name:"joe"}, joe)


db.people.drop()
db.people.insertMany([
  {"name": "joe", "age":65},
  {"name": "joe", "age":20},
  {"name": "joe", "age":49}
])
db.people.find()
joe = db.people.findOne({"name":"joe", "age":20});
joe.age++;
db.people.replaceOne({"name":"joe"}, joe)// _id 중복으로 오류남.
//db.people.replaceOne({"_id" : ObjectId("65485426f60829e3b09eb9af")},joe)
db.people.replaceOne({"_id" : joe._id}, joe)
db.people.find()



db.analytics.drop()
db.analytics.insertOne({
  url: "www.example.com",
  pageviews:52
})
db.analytics.find()
db.analytics.updateOne({url:"www.example.com"}, {$inc:{pageviews:1}})
db.analytics.find()



db.users.drop()
db.users.insertOne({
  name: "joe",
  age: 30,
  sex: "male",
  location: "Wisconsin"
})
db.users.find()
db.users.updateOne({name:"joe"}, {$set:{"favorite book" : "War and Peace"}})
db.users.find()
db.users.updateOne({name:"joe"}, {$unset:{"favorite book" :1}})
db.users.find()
db.users.updateOne({name:"joe"}, {$set:{"favorite book" :["Cat's Cradle", "Foundation Trilogy", "Ender's Game"]}})
db.users.find()


db.blog.posts.drop()
db.blog.posts.insertOne({
  title:"A Blog Post",
  content: "....",
  author: {
    name:"joe",
    email:"joe@example.com"
  }
})
db.blog.posts.find()
//db.blog.posts.updateOne({"author.name":"joe"}, {"author.name": "joe schmoe"}) // 연산자 없으면 update는 오류 발생
db.blog.posts.updateOne({"author.name":"joe"}, {$set:{"author.name": "joe schmoe"}})
db.blog.posts.find()



db.games.drop()
db.games.insertOne({game:"pinball", user:"joe"})
db.games.find()
db.games.updateOne({game:"pinball", user:"joe"}, {$inc:{score:50}}) // 기존에 없던 항목도 inc 가능
db.games.find()
db.games.updateOne({game:"pinball", user:"joe"}, {$inc:{score:100000}})
db.games.find()



db.strcounts.drop()
db.strcounts.insertOne({count:"1"})
db.strcounts.find()
db.strcounts.updateOne({}, {$inc:{count:1}}) // 믄자열 값은 inc 불가능
db.strcounts.drop()
db.strcounts.insertOne({count:1})
db.strcounts.find()
db.strcounts.updateOne({}, {$inc:{count:1}})
db.strcounts.find()



db.blog.posts.drop()
db.blog.posts.insertOne({
  title:"A blog post",
  content:"..."
})
db.blog.posts.find()
db.blog.posts.updateOne(
  {title: "A blog post"},
  {$push: {comments: {name:"joe", email:"joe@example.com", content:"nice post."}}} // $set 과는 달리 배열의 요소로 추가함.
)
db.blog.posts.find()



db.stock.ticker.drop()
db.stock.ticker.insertOne({_id:"GOOG"})
db.stock.ticker.find()
db.stock.ticker.updateOne({_id:"GOOG"}, {$push:{hourly:[562.776, 562.790, 559.123]}})
db.stock.ticker.find()
db.stock.ticker.updateOne({_id:"GOOG"}, {$unset:{hourly:1}})
db.stock.ticker.find()
db.stock.ticker.updateOne({_id:"GOOG"}, {$push:{hourly:{$each:[562.776, 562.790, 559.123]}}}) // 각각의 요소를 배열에 추가
db.stock.ticker.find()




db.movies.drop()
db.movies.insertOne({genre:"horror", top10:["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"]})
db.movies.find()
db.movies.updateOne({genre:"horror"}, {$push:{top10:{$each:["Nightmare on Elm Street", "Saw"], $slice:-10}}})
db.movies.find()

db.movies.drop()
db.movies.insertOne({genre:"horror", top10:["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"]})
db.movies.find()
db.movies.updateOne({genre:"horror"}, {$push:{top10:{$each:["Nightmare on Elm Street", "Saw"], $slice:10}}})
db.movies.find()


db.movies.drop()
db.movies.insertOne({
  genre:"horror",
  top10: [
    {name:"m1", rating:5.2},
    {name:"m2", rating:3.4},
    {name:"m3", rating:7.3},
    {name:"m4", rating:6.7},
    {name:"m5", rating:9.5},
    {name:"m6", rating:4.2},
    {name:"m7", rating:2.6},
    {name:"m8", rating:8.9},
    {name:"m9", rating:1.8}
  ]
})
db.movies.find()
db.movies.updateOne({genre:"horror"},{
  $push:{top10:{$each:[
    {name:"Night on Elm Street", rating: 6.5},
    {name:"Saw", rating: 4.5}
    ],
    $slice:-10,
    $sort:{rating:-1}
    }}
})
db.movies.find()
  
  
  
  

db.movies.drop()
db.movies.insertOne({
  genre:"horror",
  top10: [
    {name:"m1", rating:5.2},
    {name:"m2", rating:3.4},
    {name:"m3", rating:7.3},
    {name:"m4", rating:6.7},
    {name:"m5", rating:9.5},
    {name:"m6", rating:4.2},
    {name:"m7", rating:2.6},
    {name:"m8", rating:8.9},
    {name:"m9", rating:1.8}
  ]
})
db.movies.find()
db.movies.updateOne({genre:"horror"},{
  $push:{top10:{$each:[
    {name:"Night on Elm Street", rating: 6.5},
    {name:"Saw", rating: 4.5}
    ],
    $slice:-10,
    $sort:{rating:1}
    }}
})
db.movies.find()




db.movies.drop()
db.movies.insertOne({
  genre:"horror",
  top10: [
    {name:"m1", rating:5.2},
    {name:"m2", rating:3.4},
    {name:"m3", rating:7.3},
    {name:"m4", rating:6.7},
    {name:"m5", rating:9.5},
    {name:"m6", rating:4.2},
    {name:"m7", rating:2.6},
    {name:"m8", rating:8.9},
    {name:"m9", rating:1.8}
  ]
})
db.movies.find()
db.movies.updateOne({genre:"horror"},{
  $push:{top10:{$each:[
    {name:"Night on Elm Street", rating: 6.5},
    {name:"Saw", rating: 4.5}
    ],
    $slice:10,
    $sort:{rating:1}
    }}
})
db.movies.find()


db.movies.drop()
db.movies.insertOne({
  genre:"horror",
  top10: [
    {name:"m1", rating:5.2},
    {name:"m2", rating:3.4},
    {name:"m3", rating:7.3},
    {name:"m4", rating:6.7},
    {name:"m5", rating:9.5},
    {name:"m6", rating:4.2},
    {name:"m7", rating:2.6},
    {name:"m8", rating:8.9},
    {name:"m9", rating:1.8}
  ]
})
db.movies.find()
db.movies.updateOne({genre:"horror"},{
  $push:{top10:{$each:[
    {name:"Night on Elm Street", rating: 6.5},
    {name:"Saw", rating: 4.5}
    ],
    $slice:10,
    $sort:{rating:-1}
    }}
})
db.movies.find()
