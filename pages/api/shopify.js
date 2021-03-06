import axios from 'axios'
export default async(req,res) =>{
    const tmp = req.headers.cookie.split('; ').reduce(function(result, v, i, a) { var k = v.split('='); result[k[0]] = k[1]; return result; }, {})

    console.log('mi galleta',tmp);

    const headers = {headers: {'x-shopify-access-token': tmp.accessToken}}
    const url = 'https://' + tmp.shopOrigin + '/admin/api/2019-10/'
    
    const response = await axios.get(url + 'shop.json', headers)
    console.log('response from shpify', response);
    

    let data = response.data.shop
    data = JSON.parse(JSON.stringify(data))

    if(response.status === 200){

        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify({shop:data}))
    }else{
        res.statusCode = 400
    }
    

    
}