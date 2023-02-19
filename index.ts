const axios = require('axios')
const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json({extended: true }));

app.get('/api', async function (req: any, res: any) {

  const resultFetched = new Promise( async (resolve, reject) => {
    let response
    try {
      const {limit, start} = req.query
      response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}`, {
        headers: {
          'X-CMC_PRO_API_KEY': '517df3d2-67ec-4430-afe8-751a5bb22329',
        },
      });
    } catch(ex) {
      response = null;
      console.log(ex);
      reject(ex);
    }
    if (response) {
      const json = response.data;
      resolve(json);
    }
  })

  const result = await resultFetched
  res.json(result)
});

app.listen(3005, ()=> {
  console.log(`START on ${3005} `)
})
