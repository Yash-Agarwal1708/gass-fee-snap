import { OnRpcRequestHandler } from '@metamask/snap-types';

async function getPrices() {
    const response = await fetch('https://api.coincap.io/v2/assets'); 
    return response.text(); 
    }
module.exports.onRpcRequest = async ({ origin, request }) => {

    let state = await wallet.request({
      method: 'snap_manageState',
      params: ['get'],
    });
  
    // if (!state) {
    //   state = {book:[]}; 
    //   // initialize state if empty and set default data
    //   await wallet.request({
    //     method: 'snap_manageState',
    //     params: ['update', state],
    //   });
    // }
  
    switch (request.method) { 
      case 'hello':
        return getPrices().then(prices => {
        const pricesObject = JSON.parse(prices); 
        let price = new Map();
        for(let i=0;i<10;i++)
        {
        const priceBTC = pricesObject.data[i].priceUsd;
        const Id= pricesObject.data[i].id;
        price.set(Id,priceBTC)
        //price.set[Id] =priceBTC;
      }
        let price_book = state.book.map(function(item){
            return `${item.name}: ${item.address}`; 
          }).join("\n"); 
        return wallet.request({
          method: 'snap_confirm',
          params: [
            {
              prompt: `Hello, ${origin}!`,
              description: 'Address book:',
              textAreaContent: address_book,
            },
          ],
        });
    }); 
      default:
        throw new Error('Method not found.');
    }
}
