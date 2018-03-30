const Mock=require("mockjs");
const {Random}=Mock;
const fs=require('fs');
let arr = ['a','b','c','d'];
Random.extend({
    mealType:()=>{
        let item = Random.pick(arr);
        let idx = arr.indexOf(item);
        let deleted = arr.splice(idx,1);
        console.log(deleted)
        return item
    }
})
let res=Mock.mock({
    "success":1,
    "info":"请求成功",
    "code":1001,
    "list|8":[
        {
            "cataid":1,
            "title":()=>Random.mealType(),
            "goodslist|6":[{
                // "goods_id":()=>Random.
                "goods_name":()=>Random.cword(2,5),
                "detail":()=>Random.cparagraph(),
                "discount_price":()=>Random.natural(1,99),
                "img":()=>Random.image("800x800",Random.color(),"#fff","png","!"),
                // "store_id":,
                // "store_name":
            }]
        }
    ]
})
fs.writeFileSync("data.json",JSON.stringify(res))