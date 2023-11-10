db.companies.drop()
db.companies.insertOne(
{
 "name" : "Facebook",
 "category_code" : "social",
 "founded_year" : 2004,
 "description" : "Social network",
 "relationships":[
   {
     "is_past":false,
     "title":"Founder and CEO, Board Of Directors",
     "person":{
       "first_name":"Mark",
       "last_name":"Zuckerberg",
       "permalink":"mark-zuckerberg"
     }
   },
   {
     "is_past":true,
     "title":"CFO",
     "person":{
       "first_name":"David",
       "last_name":"Ebersman",
       "permalink":"david-ebersman"
     }
   }   
 ], 
 "funding_rounds" : [{
 "id" : 4,
 "round_code" : "b",
 "raised_amount" : 27500000,
 "raised_currency_code" : "USD",
 "funded_year" : 2006,
 "investments" : [
 {
 "company" : null,
 "financial_org" : {
 "name" : "Greylock Partners",
 "permalink" : "greylock"
 },
 "person" : null
 },
 {
 "company" : null,
 "financial_org" : {
 "name" : "Meritech Capital Partners",
 "permalink" : "meritech-capital-partners"
 },
 "person" : null
 },
 {
 "company" : null,
 "financial_org" : {
 "name" : "Founders Fund",
 "permalink" : "founders-fund"
 },
 "person" : null
 },
 {
 "company" : null,
 "financial_org" : {
 "name" : "SV Angel",
 "permalink" : "sv-angel"
 },
 "person" : null
 }
 ]
 },
 {
 "id" : 2197,
 "round_code" : "c",
 "raised_amount" : 15000000,
 "raised_currency_code" : "USD",
 "funded_year" : 2008,
 "investments" : [
 {
 "company" : null,
 "financial_org" : {
 "name" : "European Founders Fund",
 "permalink" : "european-founders-fund"
 },
 "person" : null
 }
 ]
 }],
 "ipo" : {
 "valuation_amount" : NumberLong("104000000000"),
 "valuation_currency_code" : "USD",
 "pub_year" : 2012,
 "pub_month" : 5,
 "pub_day" : 18,
 "stock_symbol" : "NASDAQ:FB"
 }
}
)

db.companies.insertOne(
{
 "name" : "Digg",
 "category_code" : "social",
 "founded_year" : 2004,
 "description" : "Social network",
 "relationships":[
   {
     "is_past":false,
     "title":"Founder and CEO, Board Of Directors",
     "person":{
       "first_name":"David",
       "last_name":"Ebersman",
       "permalink":"david-ebersman"
     }
   },
   {
     "is_past":true,
     "title":"CFO",
     "person":{
       "first_name":"Robin",
       "last_name":"Hood",
       "permalink":"robin-hood"
     }
   }   
 ], 
 "funding_rounds" : [{
 "id" : 4,
 "round_code" : "b",
 "raised_amount" : 25000000,
 "raised_currency_code" : "USD",
 "funded_year" : 2006,
 "investments" : [
 {
 "company" : null,
 "financial_org" : {
 "name" : "Meritech Capital Partners",
 "permalink" : "meritech-capital-partners"
 },
 "person" : null
 },
 {
 "company" : null,
 "financial_org" : {
 "name" : "Founders Fund",
 "permalink" : "founders-fund"
 },
 "person" : null
 },
 {
 "company" : null,
 "financial_org" : {
 "name" : "SV Angel",
 "permalink" : "sv-angel"
 },
 "person" : null
 }
 ]
 },
 {
 "id" : 2197,
 "round_code" : "c",
 "raised_amount" : 15000000,
 "raised_currency_code" : "USD",
 "funded_year" : 2008,
 "investments" : [
 {
 "company" : null,
 "financial_org" : {
 "name" : "European Founders Fund",
 "permalink" : "greylock"
 },
 "person" : null
 }
 ]
 }],
 "ipo" : {
 "valuation_amount" : NumberLong("100000000000"),
 "valuation_currency_code" : "USD",
 "pub_year" : 2012,
 "pub_month" : 5,
 "pub_day" : 18,
 "stock_symbol" : "NASDAQ:FB"
 }
}
)

db.companies.find()
db.companies.aggregate(
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$project:{
    _id:0,
    name:1,
    ipo:"$ipo.pub_year",
    valuation:"$ipo.valuation_amount",
    funders:"$funding_rounds.investments.financial_org.permalink"
  }}
)

db.companies.aggregate(
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$unwind:"$funding_rounds"},
  {$project:{
    _id:0,
    name:1,
    funders:"$funding_rounds.investments.financial_org.permalink",
    amount:"$funding_rounds.raised_amount",
    year:"$funding_rounds.funded_year"
  }}
)

db.companies.aggregate(
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$unwind:"$funding_rounds"},
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$project:{
    _id:0,
    name:1,
    funders:"$funding_rounds.investments.financial_org.permalink",
    amount:"$funding_rounds.raised_amount",
    year:"$funding_rounds.funded_year"
  }}
)

db.companies.aggregate(
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$project:{
    _id:0,
    name:1,
    founded_year:1,
    rounds:{$filter:{
      input:"$funding_rounds",
      as:"round",
      cond:{$gte:["$$round.raised_amount",20000000]}
    }}
  }},
  {$match:{"rounds.investments.financial_org.permalink":"greylock"}}
)

db.companies.aggregate(
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$project:{
    _id:0,
    name:1,
    founded_year:1,
    first_round:{$arrayElemAt:["$funding_rounds",0]},
    last_round:{$arrayElemAt:["$funding_rounds",-1]}
  }}
)

db.companies.aggregate(
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$project:{
    _id:0,
    name:1,
    founded_year:1,
    early_rounds:{$slice:["$funding_rounds",1,3]}
  }}
)

db.companies.aggregate(
  {$match:{"funding_rounds.investments.financial_org.permalink":"greylock"}},
  {$project:{
    _id:0,
    name:1,
    founded_year:1,
    total_rounds:{$size:"$funding_rounds"}
  }}
)

db.companies.aggregate(
  {$match:{"funding_rounds":{$exists:true, $ne:[]}}},
  {$project:{
    _id:0,
    name:1,
    largest_round:{$max:"$funding_rounds.raised_amount"}
  }}
)

db.companies.aggregate(
  {$match:{"funding_rounds":{$exists:true, $ne:[]}}},
  {$project:{
    _id:0,
    name:1,
    total_funding:{$sum:"$funding_rounds.raised_amount"}
  }}
)
db.getCollection("companies").find({})
db.companies.aggregate([
  {$group:{
    _id:"$founded_year",
    average_of_valuation_amount:{$avg:"$ipo.valuation_amount"}
  }},
  {$sort:{average_of_valueation_amount:-1}}
])

db.companies.aggregate([
  {$match:{"relationships.person":{$ne:null}}},
  {$project:{relationships:1, _id:0}},
  {$unwind:"$relationships"},
  {$group:{
    _id:"$relationships.person",
    count:{$sum:1}
  }},
    {$sort:{count:-1}}
])

db.companies.aggregate([
  {$match:{founded_year:{$gte:2000}}},
  {$group:{
    _id:{founded_year:"$founded_year"},
    companies:{$push:"$name"}
  }},
    {$sort:{"_id.founded_year":1}}
])

db.companies.aggregate([
  {$match:{funding_rounds:{$ne:[]}}},
  {$unwind:"$funding_rounds"},
  {$sort:{
    "funding_rounds.funded_year":1
    }},
  {$group:{
    _id:{company:"$name"},
    funding:{
      $push:{
        amount:"$funding_rounds.raised_amount",
        year:"$funding_rounds.funded_year"
      }
    }
  }}
])

db.companies.aggregate([
  {$match:{funding_rounds:{$exists:true,$ne:[]}}},
  {$unwind:"$funding_rounds"},
  {$sort:{
    "funding_rounds.funded_year":1
    }},
  {$group:{
    _id:{company:"$name"},
    first_round:{$first:"$funding_rounds"},
    last_round:{$last:"$funding_rounds"},
    num_rounds:{$sum:1},
    total_raised:{$sum:"$funding_rounds.raised_amount"}
  }},
  {$project:{
    _id:0,
    company:"$_id.company",
    first_round:{
      amount:"$first_round.raised_amount",
      year:"$first_round.funding_year"
    },
    last_round:{
      amount:"$last_round.raised_amount",
      year:"$last_round.funding_year"
    },
    num_rounds:1,
    total_raised:1
  }},
  {$sort:{total_raised:-1}},
  {$out:"abc"}
])

db.abc.find()





















