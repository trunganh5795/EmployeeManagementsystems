var tacGia = "BinZ";
var tacPham = "Big City Boi";

// es5
console.log(tacGia + " - " + tacPham); // "BinZ - Big citi boi"
// es6
console.log(`${tacGia} - ${tacPham}`);

// falsy
if (false){}
if (null){}
if (undefined){}
if (0){}
if (NaN){}
if (''){}
if (""){}

// truthy
if("false"){
    console.log("object")
}
