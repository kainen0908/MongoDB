db.ord.drop()
// Embedded Document 스타일로 구성하기
db.ord.insert({
  ord_id:"2012-09-012345",
  customer_name:"WomanSport",
  emp_name:"Magee",
  total:"601100",
  payment_type:"Credit",
  order_filled:"Y",
  item_id:[ // Rich Document: 도큐먼트 안에 도큐먼트를 가지는 구조
    {
      item_id:"1",
      product_name:"Bunny Boot",
      item_price:135,
      qty:500,
      price:67000
    },
    {
      item_id:"2",
      product_name:"Pro Ski Boot",
      item_price:380,
      qty:400,
      price:152000
    }  
  ]
})
db.ord.find()
db.ord.drop()
// Extent Document 스타일로 구성하기
db.ord.insertOne({
  ord_id:"2012-09-012345",
  customer_name:"WomanSport",
  emp_name:"Magee",
  total:"601100",
  payment_type:"Credit",
  order_filled:"Y"
})
db.ord.find()
db.ord.update(
  {ord_id:"2012-09-012345"},
  {$set:{item_id:[
    {
      item_no:"1",
      product_name:"Bunny Boot",
      item_price:135,
      qty:500,
      price:67000
    },
    {
      item_no:"2",
      product_name:"Pro Ski Boot",
      item_price:380,
      qty:400,
      price:152000
    }  
  ]}}
)
db.ord.find()
db.ord.drop()
// Link를 이용하여 구성하기
db.ord.insertOne({
  ord_id:"2012-09-012345",
  customer_name:"WomanSport",
  emp_name:"Magee",
  total:"601100",
  payment_type:"Credit",
  order_filled:"Y"
})
o = db.ord.findOne({ord_id:"2012-09-012345"})
db.ord_detail.insertOne({
  ord_id:"2012-09-012345",
  item_id:[
    {
      item_no:"1",
      product_name:"Bunny Boot",
      item_price:135,
      qty:500,
      price:67000
    },
    {
      item_no:"2",
      product_name:"Pro Ski Boot",
      item_price:380,
      qty:400,
      price:152000
    }  
  ],
  ordid_id: o._id
})
db.ord_detail.find()
db.ord_detail.findOne({ordid_id:o._id})
db.ord.drop()
//DBRef 함수를 이용한 Link
db.ord_detail.drop()
x = {
  ord_id:"2012-09-012345",
  customer_name:"WomanSport",
  emp_name:"Magee",
  total:"601100",
  payment_type:"Credit",
  order_filled:"Y"
}
db.ord.insertOne(x)
db.ord.find()
db.ord_detail.insertOne({
  ord_id:"2012-09-012345",
  item_id:[
    {
      item_no:"1",
      product_name:"Bunny Boot",
      item_price:135,
      qty:500,
      price:67000
    },
    {
      item_no:"2",
      product_name:"Pro Ski Boot",
      item_price:380,
      qty:400,
      price:152000
    }  
  ],
  ordid_id: [new DBRef("ord", x._id)]
})
db.ord_detail.find()

db.department.drop()

db.department.insert({deptno:10 , dname : "Computing Team", locno : 1}) 
db.department.insert({deptno:20 , dname : "Development Team", locno : 2}) 
db.department.insert({deptno:30 , dname : "Design Team", locno : 3}) 
db.department.insert({deptno:40 , dname : "BigData Team", locno : 4}) 

db.department.find()

db.employees.aggregate([
  {$project:{
    empno:1,
    job:1,
    deptno:1
  }},
  {$lookup:{
    from:"department",
    localField:"deptno",
    foreignField:"deptno",
    as:"depart_Info"
  }},
  {$sort:{empno:-1}}
])

db.location.drop()

db.location.insert({locno:1 , lname : "San Fransciso"}) 
db.location.insert({locno:2 , lname : "New York"}) 
db.location.insert({locno:3 , lname : "San Diego"}) 
db.location.insert({locno:4 , lname : "Boston"}) 

db.location.find()

db.employees.aggregate([
  {$match:{deptno:10}},
  {$project:{
    _id:0,
    empno:1,
    ename:1,
    job:1,
    deptno:1
  }},
  {$lookup:{
    from:"department",
    localField:"deptno",
    foreignField:"deptno",
    as:"depart_Info"
  }},
  {$unwind:"$depart_Info"},
  {$lookup:{
    from:"location",
    localField:"depart_Info.locno",
    foreignField:"locno",
    as:"locat_Info"
  }},
   {$unwind:"$locat_Info"},
   {$project:{
    empno:1,
    ename:1,
    job:1,
    "depart_Info.deptno":1,
    "depart_Info.dname":1,
    "locat_Info.locno":1,
    "locat_Info.lname":1,
  }},
  {$out:"emp_dept_location"}
])
db.emp_dept_location.find()
// 다대다 구현
db.category.insert({cname:"Note_Book", pname:["Asus EP121 M50"]})
db.category.insert({cname:"Tablet", pname:["Asus EP121 M50", "iPad3"]})
db.category.insert({cname:"SlatePc", pname:["Asus EP121 M50","Samsung eSlate 7"]})
db.product.insert({pname:"Asus EP121", cname:["Note Book", "Tablet", "SlatePC"]})
db.product.insert({pname:"Samsung eSlate 7", cname:["SlatePC"]})
db.product.insert({pname:"iPad3", cname:["Tablet"]})
// 상속 패턴
db.car.insertOne({engine:"A", frame:"Ax_1", car_type:"TAXI", lamp:1})
db.car.insertOne({engine:"B", frame:"Ax_3", car_type:"BUS", auto_door:2})
//관계형 DB 스타일
// db.car.insertOne({engine:"A", frame:"Ax_1", car_type:"TAXI", lamp:1, auto_door:null})
// db.car.insertOne({engine:"B", frame:"Ax_3", car_type:"BUS", lamp:null, auto_door:2})
// 계층형 패턴 구현
db.emp.drop()
db.emp.insertOne({"_id":7839, name:"KING", children:[7782]})
db.emp.insertOne({"_id":7782, name:"CLARK", parent:7839, children:[7834]})
db.emp.insertOne({"_id":7934, name:"MILLER", ancestor:7839, parent:7782})

db.emp.find({ancestor:7839})
db.emp.find({parent:7839})
db.emp.find({children:7782})
// validator: 구속조건(constraint) 설정
db.emp.drop()
db.createCollection("emp",
  {
    capped:false,
    validator:{$and:[
      {empno:{$type:16}},
      {ename:{$type:"string"}},
      {job:{$type:"string"}},
      {sal:{$type:16}},
      {hiredate:{$type:"date"}},
      {deptno:{$type:16}},
      {deptno:{$in:[10,20]}}
    ]}
})
db.emp.insertOne({empno:1111, ename:"jjm", job:"manager", sal:1200, hiredate:ISODate(), deptno:10})

db.product.drop()

db.product.drop()

db.product.insert( { p_code : 1017, p_category : 'N',  p_status : 'Y', p_text : 'Protective knee pads for any number of physical activities including bicycling and skating (4-wheel, in-line, and ice).  Also provide support for stress activities such as weight-lifting.  Velcro belts allow easy adjustment for any size and snugness of fit.  Hardened plastic shell comes in a variety of colors, so you can buy a pair to match every outfit.  Can also be worn at the beach to cover particularly ugly knees.' })
db.product.insert( { p_code : 1019, p_category : 'N',  p_status : 'Y', p_text : 'Protective elbow pads for any number of physical activities including bicycling and skating (4-wheel, in-line, and ice).  Also provide support for stress activities such as weight-lifting.  Velcro belts allow easy adjustment for any size and snugness of fit.  Hardened plastic shell comes in a variety of colors, so you can buy a pair to match every outfit.'})
db.product.insert( { p_code : 1037, p_status : 'N' })
db.product.insert( { p_code : 1039, p_status : 'N' })
db.product.insert( { p_code : 1043, p_status : 'N' })
db.product.insert( { p_code : 1286, p_category : 'N',  p_status : 'Y', p_text : 'Dont slack off try the Slaker Water Bottle.  With its 1 quart capacity, this is the only water bottle you need.  It is lightweight, durable, and guaranteed for life to be leak proof.  It comes with a convenient velcro strap so it can be conveniently attached to your bike or other sports equipment.' })
db.product.insert( { p_code :  518, p_category : 'N',  p_status : 'Y', p_text : 'Perfect for the beginner.  Rear entry (easy to put on with only one buckle), weight control adjustment on side of boot for easy access, comes in a wide variety of colors to match every outfit.' })
db.product.insert( { p_code :  519, p_category : 'N',  p_status : 'Y', p_text : 'If you have mastered the basic techniques you are ready for the Ace Ski Boot.  This intermediate boot comes as a package with self adjustable bindings that will adapt to your skill and speed. The boot is designed for extra grip on slopes and jumps.'})
db.product.insert( { p_code :  520, p_category : 'N',  p_status : 'Y', p_text : 'The Pro ski boot is an advanced boot that combines high tech and comfort.  It\'s made of fibre that will mould to your foot with body heat.  If you\'re after perfection, don\'t look any further: this is it!'})
db.product.insert( { p_code :  527, p_status : 'Y' })
db.product.insert( { p_code :  528, p_category : 'N',  p_status : 'Y', p_text : 'Lightweight aluminum pole, comes in a variety of sizes and neon colors.  Comfortable adjustable straps.' })
db.product.insert( { p_code :  933, p_category : 'Y',  p_status : 'Y', p_text : 'The widest, strongest, and knobbiest tires for mountain bike enthusiasts.  Guaranteed to withstand pummelling that will reduce most bicycles (except for the Himalayan) to scrap iron.  These tires can carry you to places where nobody would want to bicycle.  Sizes to fit all makes of mountain bike including wide and super wide rims. Steel-banded radial models are also available by direct factory order.' })

db.product.find()

db.product.createIndex({p_text:"text"})

db.product.find({$text:{$search:"boot"}})

db.product.find({$text:{$search:"BOOT"}})

db.product.find({$text:{$search:"boots"}})

db.product.find({$text:{$search:"boot bicycles"}})

db.product.find({$text:{$search:"bicycles "}})

db.product.find({$text:{$search:"\"bicycles\""}})

db.product.find({$text:{$search:"\"Velcro belts\""}})

db.product.find({$text:{$search:"boot -Velcro"}})

db.product.find({$text:{$search:"bicycles"}},{score:{$meta:"textScore"}})
