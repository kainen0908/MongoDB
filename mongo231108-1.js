db.spatial.drop()
for(var i=0; i <100; i++) db.spatial.insertOne({pos:[i%10, Math.floor(i/10)]})
db.spatial.find()
db.spatial.createIndex({pos:"2d"})
db.spatial.find({pos:{$near:[5,5]}})
db.spatial.find({pos:{$near:[5,5]}}).limit(5)
db.spatial.find({pos:{$within:{$center:[[5,5],2]}}})
db.spatial.find({pos:{$within:{$box:[[5,5],[6,6]]}}})
db.spatial.find({pos:{$within:{$polygon:[[3,3],[5,7],[7,4]]}}})

db.tel_pos.drop()
db.tel_pos.insertMany([
{
  mobile_no:"01038641858",
  last_pos:[
    [127.0945116, 37.5353970],
    [125.9815316, 37.5985375],
    [127.0305035, 37.5017141]
  ]
},
{
  mobile_no:"01075993678",
  last_pos:[
    [127.1353452, 37.4576521],
    [125.1359081, 37.4512311],
    [127.7823091, 36.3339801]
  ]
}]
)
db.tel_pos.createIndex({last_pos:"2d"})
db.tel_pos.find(
  {last_pos:{$within: 
    {$centerSphere:[[127.0352915, 37.5360206], 3/3963.2]}
  }},
  {_id:0, mobile_no:1, last_pos:1}
).pretty() // 3963.2는 지구 반지름의 마일 값. 3마일 거리를 라디안 값으로 지정

db.tel_pos.find(
  {last_pos:{$nearSphere:[127.0352915, 37.5360206]}
  },
  {_id:0, mobile_no:1, last_pos:1}
).pretty()

db.position.drop()
db.position.createIndex({loc:"2dsphere"})

db.position.insert( { "_id" : "m239092", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [127.1058431, 37.5164113] }, "pos_name"  : [ "name=잠실역 2호선", "trans_type=지하철" ] })
db.position.insert( { "_id" : "m239091", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [127.0980748, 37.5301218] }, "pos_name"  : [ "name=동서울 터미널", "trans_type=버스터미널" ] })
db.position.insert( { "_id" : "m239090", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [127.0952154, 37.5398467] }, "pos_name"  : [ "name=강변역 2호선", "trans_type=지하철" ] })
db.position.insert( { "_id" : "m239089", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [127.0742172, 37.5419541] }, "pos_name"  : [ "name=건국대학역 2호선", "trans_type=지하철" ] })
db.position.insert( { "_id" : "m239070", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [126.9864291, 37.5672393] }, "pos_name"  : [ "name=을지로 입구역 2호선", "trans_type=지하철" ] })
db.position.find()
db.position.find({loc:{$near:
  {$geometry:
    {
      type:"Point",
      coordinates:[127.1058431, 37.5164113]
    },
    $maxDistance:3000
  }
}}).pretty()

db.position.insert( { "_id" : "m239093", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [127.0846600, 37.5120906] }, "pos_name"  : [ "name=신천역 2호선", "trans_type=지하철" ] })
db.position.insert( { "_id" : "m239094", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [127.0740075, 37.5133497] }, "pos_name"  : [ "name=종합운동장역 2호선", "trans_type=지하철" ] })
db.position.insert( { "_id" : "m239095", "data_type" : NumberLong(1), "loc" : { "type" : "Point", "coordinates" : [127.0847829, 37.5105344] }, "pos_name"  : [ "name=삼성역 2호선", "trans_type=지하철" ] })
db.position.find()

db.position.reIndex({loc:"2dsphere"})

db.position.find({loc:{$geoIntersects:
  {$geometry:
    {
      type:"LineString",
      coordinates:[
        [127.1058431, 37.5164113], // 잠실역 2호선
        [127.0846600, 37.5120906], // 신천역 2호선
        [127.0740075, 37.5133497] // 종합운동장역 2호선
      ]
    }
  }
}})

db.position.insert( { "_id" : "m239199", "data_type" : NumberLong(1), "loc" : { "type" : "LineString", "coordinates" : [[127.0846600, 37.5120906],[127.0846600, 37.6120906]] }, "pos_name"  : [ "name=신천역 2호선 북쪽 연장선", "trans_type=직선" ] })

db.position.find({loc:{$geoIntersects:
  {$geometry:
    {
      type:"LineString",
      coordinates:[
        [127.1058431, 37.5164113], // 잠실역 2호선
        [127.0846600, 37.5120906], // 신천역 2호선
        [127.0740075, 37.5133497] // 종합운동장역 2호선
      ]
    }
  }
}})

db.position.insert( { "_id" : "m239200", "data_type" : NumberLong(1), "loc" : { "type" : "LineString", "coordinates" : [[127.0846, 37.5120906],[127.0846600, 37.6120906]] }, "pos_name"  : [ "name=신천역 2호선 교차선", "trans_type=직선" ] })

db.position.find({loc:{$geoIntersects:
  {$geometry:
    {
      type:"LineString",
      coordinates:[
        [127.1058431, 37.5164113], // 잠실역 2호선
        [127.0846600, 37.5120906], // 신천역 2호선
        [127.0740075, 37.5133497] // 종합운동장역 2호선
      ]
    }
  }
}})

db.position.insert( { "_id" : "m12901", 
                     "loc" : { "type" : "Point", 
                               "coordinates" : [127.126178, 37.5140978] }, 
                     "pos_name"  : [ "add_name=카페", 
                                     "add_type=Public Sport" ]
                  })

db.position.insert( { "_id" : "m12902", 
                     "loc" : { "type" : "Point", 
                               "coordinates" : [127.1224733, 37.5239739] }, 
                     "pos_name"  : [ "add_name=올림픽 수영장", 
                                     "add_type=Resturant" ]
                  })

db.position.find()

db.position.find({loc:
  {$geoWithin: 
    {$geometry:
    {
      type:"Polygon",
      coordinates: [[
        [127.1261076, 37.5191452],
        [127.1220412, 37.5221428],
        [127.1224733, 37.5239739],
        [127.1269535, 37.5231093],
        [127.1290333, 37.5179105],
        [127.1239271, 37.5116750],
        [127.1261076, 37.5191452]
      ]]
    }}
  }
})

db.position.find({loc:
  {$geoNear: 
    {$geometry:
    {
      type:"Polygon",
      coordinates: [[
        [127.1261076, 37.5191452],
        [127.1220412, 37.5221428],
        [127.1224733, 37.5239739],
        [127.1269535, 37.5231093],
        [127.1290333, 37.5179105],
        [127.1239271, 37.5116750],
        [127.1261076, 37.5191452]
      ]]
    }}
  }
})

db.neighborhoods.createIndex({geometry:"2dsphere"})
db.neighborhoods.getIndexes()
db.restaurants.createIndex({location:"2dsphere"})
db.restaurants.getIndexes()

db.neighborhoods.find({name:"Clinton"})
db.neighborhoods.find({name:"Little Pie Company"})
db.neighborhoods.find({geometry:{$geoIntersects:{$geometry:{type:"Point", coordinates:[-73.93414657, 40.82302903]}}}})
var neighborhood = db.neighborhoods.findOne({geometry:{$geoIntersects:{$geometry:{type:"Point", coordinates:[-73.93414657, 40.82302903]}}}})
printjson(neighborhood)
db.restaurants.find({
  location:{$geoWithin:{$geometry:neighborhood.geometry}}
},{name:1, _id:0})

db.restaurants.find({
  location:{
    $geoWithin:{
      $centerSphere:[[-73.93414657, 40.82302903], 1/3963.2]
    }
  }
})

var METERS_PER_MILE = 1609.34;
db.restaurants.find({
  location:{
    $nearSphere:{
      $geometry:{
        type:"Point",
        coordinates:[-73.93414657, 40.82302903]
      },
      $maxDistance: 1000
    }
  }
})

{title:"text"}









