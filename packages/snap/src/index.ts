import { OnRpcRequestHandler } from '@metamask/snap-types';


//displaying the price

async function getPrices() {
const response = await fetch('https://api.coincap.io/v2/assets'); 
return response.text(); 
}
//displaying the price

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
switch (request.method) {
  case 'hello':
    return getPrices().then(prices => {
      const pricesObject = JSON.parse(prices); 
    
      //price[i]=pricesObject.data[i].priceUsd;
 
      let price = new Map();
      for(let i=0;i<10;i++)
      {
      const priceBTC = pricesObject.data[i].priceUsd;
      const Id= pricesObject.data[i].id;
      price.set(Id,priceBTC)
      //price.set[Id] =priceBTC;
    }
    
      // const priceBTC = pricesObject.data[0].priceUsd;
      // const Id= pricesObject.data[0].id;
/**
      const priceBTC = pricesObject.data[0].priceUsd;
      const Id= pricesObject.data[0].id;
      */
      return wallet.request({
        method: 'snap_confirm', 
        params: [
          {
            prompt: "hello",
            description:
              'Current gas fees from api.coincap.io:',
            textAreaContent:`${price}`
              
              // `${Id}:${priceBTC}`
          }
        ]
      }); 
    }); 
  default:
    throw new Error('Method not found.');
}
};

