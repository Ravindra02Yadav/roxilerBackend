const express = require("express");
const Item = require("../Models/Sales.model");
const {isValidMonth} = require('../middleware/IsValidMonth.middleware')
const noteRouter = express.Router();

noteRouter.use(isValidMonth)

const getMonthinNumber = (month) => {
  switch (true) {
    case (["JANUARY", "JAN"].includes(month.toUpperCase())):
      return 0;
    case (["FEBRUARY", "FEB"].includes(month.toUpperCase())):
      return 1;
    case (["MARCH", "MAR"].includes(month.toUpperCase())):
      return 2;
    case (["APRIL", "APR"].includes(month.toUpperCase())):
      return 3;
    case (["MAY", "MAY"].includes(month.toUpperCase())):
      return 4;
    case (["JUNE", "JUN"].includes(month.toUpperCase())):
      return 5;
    case (["JULY", "JUL"].includes(month.toUpperCase())):
      return 6;
    case (["AUGUST", "AUG"].includes(month.toUpperCase())):
      return 7;
    case (["SEPTEMBER", "SEP"].includes(month.toUpperCase())):
      return 8;
    case (["OCTOBER", "OCT"].includes(month.toUpperCase())):
      return 9;
    case (["NOVEMBER", "NOV"].includes(month.toUpperCase())):
        return 10
    case (["DECEMBER", "DEC"].includes(month.toUpperCase())):
      return 11;
    default: {
        
      return "Invalid Month";
    }
  }

//  console.log(month)
};

noteRouter.get("/sales", async (req, res) => {

    const {month} = req.query

  const salesReport = await Item.find();

  const totalSalesAmount =  salesReport.reduce((acc, el) => {
    const dateOfSale = new Date(el.dateOfSale);

    if(getMonthinNumber(month) === dateOfSale.getMonth()) {

      if(el.sold) {
        return {...acc , totalPrice : acc.totalPrice + el.price , totalSaleItem : acc.totalSaleItem + el.sold }
      } else {
        return {...acc , notSaleItem : acc.notSaleItem+ !el.sold}
      }
    
    }

    return acc
  
  }, {totalPrice : 0 , totalSaleItem : 0 , notSaleItem : 0});

//   console.log(totalSalesAmount)
res.send(totalSalesAmount)
 
});

noteRouter.get("/pricerange", async (req, res)=>{
    const {month} = req.query


    try {
        
        const salesDetail = await Item.find()

        const totalSalesReport =  salesDetail.reduce((acc , curr) => {
            const dateOfSale = new Date(curr.dateOfSale);
           
            if(getMonthinNumber(month) === dateOfSale.getMonth()) {
                if(curr.price >=0 && curr.price <= 100) {
                    return {...acc , "0 -  100" : acc['0 -  100'] + 1}
                }
                else if(curr.price >=101 && curr.price <= 200){
                    return {...acc , "101 -  200" : acc['101 -  200'] + 1}
                }
                else if(curr.price >=201 && curr.price <= 300){
                    return {...acc , "201 - 300" : acc['201 - 300'] + 1}
                }
                else if(curr.price >=301 && curr.price <= 400){
                    return {...acc , "301 - 400" : acc['301 - 400'] + 1}
                }
                else if(curr.price >=401 && curr.price <= 500){
                    return {...acc , "401 - 500" : acc['401 - 500'] + 1}
                }
                else if(curr.price >=501 && curr.price <= 600){
                    return {...acc , "501 - 600" : acc['501 - 600'] + 1}
                }
                else if(curr.price >=601 && curr.price <= 700){
                    return {...acc , "601 - 700" : acc['601 - 700'] + 1}
                }
                else if(curr.price >=701 && curr.price <= 800){
                    return {...acc , "701 - 800" : acc['701 - 800'] + 1}
                }
                else if(curr.price >=801 && curr.price <= 900){
                    return {...acc , "801 - 900" : acc['801 - 900'] + 1}
                }
                else if(curr.price >=901 ){
                    return {...acc , "901 - above" : acc['901 - above'] + 1}
                }
            }

            return acc 
        } , {"0 -  100" : 0 , "101 -  200" : 0 , "201 -  300" : 0 , "301 -  400" : 0 , "401 -  500" : 0 , "501 -  600" : 0 , "601 -  700" : 0 , "701 -  800" : 0 , "801 -  900" : 0 , "901 -  above" : 0} )

        res.send(totalSalesReport)

    } catch (error) {
        console.log(error)
    }
});

noteRouter.get("/category", async (req, res)=>{
    const {month} = req.query
    const getCategory = {}

    try {
        
        const salesCategory  = await Item.find()

        salesCategory.map((i) => {

            const dateOfSale = new Date(i.dateOfSale);
            if(getMonthinNumber(month) === dateOfSale.getMonth()) {
                getCategory[i.category] = 0
                // console.log(i)
            }

        })


       const salesCategoryItem = salesCategory.reduce((acc , el) => {

        const dateOfSale = new Date(el.dateOfSale);
           
        if(getMonthinNumber(month) === dateOfSale.getMonth()) {
            return {...acc , [el.category] : acc[el.category] + 1}
        }
        return acc;

        } , getCategory)
        res.send(salesCategoryItem)
        // console.log(getCategory)
    } catch (error) {
        
    }




});

// noteRouter.get("/finalresponse", async (req, res)=>{

//     const {month} = req.query

//   const totalSales = await Item.find();

//   const totalSalesAmount =  salesReport.reduce((acc, el) => {
 
  
//   });
// res.send(totalSalesAmount)
 
   
    
// })

module.exports = { noteRouter };
