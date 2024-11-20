import data from "../products.json";

function findProduct(name) {
    console.log(name)
    return new Promise((resolve , reject) => {
        setTimeout(()=>{
            for(let i of data.products) {
                if(i.name.trim() === name.trim()) {
                    resolve(i);
                } 
            }
            reject({error: "Product Not Found !"})
        },200)
    })
} 



export default async function ProductLoader({params , request}){
    let data = null;
    try{
        data = await findProduct(params.name);
    }catch(error){
        data = error;
    }
    return data;
}