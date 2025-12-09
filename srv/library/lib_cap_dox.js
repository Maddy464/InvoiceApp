const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const cds = require('@sap/cds')
const { Readable } = require('stream');
const { log } = require("console");
const { buffer } = require('stream/consumers');
const cap_dox_key = {
            "sap.cloud.service": "com.sap.apps.documentinformationextraction",
      "saasregistryenabled": true,
      "html5-apps-repo": {
        "app_host_id": "a64bcab8-c7f6-4fb1-a185-58842a6bd6a2"
      },
      "uaa": {
        "tenantmode": "shared",
        "sburl": "https://internal-xsuaa.authentication.us10.hana.ondemand.com",
        "subaccountid": "15df4bf5-71f8-4a02-9112-aec6bea3183d",
        "credential-type": "binding-secret",
        "clientid": "sb-2d9137f7-b895-47c0-ba92-672979415ca7!b533128|dox-xsuaa-std-trial!b10844",
        "xsappname": "2d9137f7-b895-47c0-ba92-672979415ca7!b533128|dox-xsuaa-std-trial!b10844",
        "clientsecret": "19fb168e-7424-4ca2-8042-5481ece22df6$IHwnqISv-yVsAABUliusqaWcgPLG-EIdZ1jvoV4a2bI=",
        "serviceInstanceId": "2d9137f7-b895-47c0-ba92-672979415ca7",
        "url": "https://8d33ddbbtrial.authentication.us10.hana.ondemand.com",
        "uaadomain": "authentication.us10.hana.ondemand.com",
        "verificationkey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3VCQhhAqNPcZiudW/v5b\ndAYub9wXdr/Zl8V3DT2mY3J5dyRqPv4fXHl7BwPw/5IiULyHTiuW0iuikUdiJno6\nwnn+X66DHD/WS3oryyOqFoxmwITnDtj2sgwTrGgRbv+AwNQkNOHYLRpG+c9ySjpM\nwK7u/IXrKOujykxXEpq/tesk25FMzHOKJds+FNn3J0EhBtPvlqAjHXg0+l3wqBLS\nWFbOlteIKv6G2xo0NBLhdu8l5Y65dCrmqRbIuZfUbTIn8x/WE/jDVnKMDvBUzEZl\nTpyP6/LJi857yYhgUk8yRdFez5xLlgcckTJvfXZ/P6iZQ4SxCxqafTidmUzZCcr9\n7wIDAQAB\n-----END PUBLIC KEY-----",
        "apiurl": "https://api.authentication.us10.hana.ondemand.com",
        "identityzone": "8d33ddbbtrial",
        "identityzoneid": "15df4bf5-71f8-4a02-9112-aec6bea3183d",
        "tenantid": "15df4bf5-71f8-4a02-9112-aec6bea3183d",
        "zoneid": "15df4bf5-71f8-4a02-9112-aec6bea3183d"
      },
      "url": "https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com",
      "dwcreuseservice": true,
      "swagger": "/document-information-extraction/v1/",
      "endpoints": {
        "backend": {
          "url": "https://aiservices-trial-dox.cfapps.us10.hana.ondemand.com",
          "timeout": 30000
        }
      },
      "tenantuiurl": "https://8d33ddbbtrial.us10-trial.doc.cloud.sap"
    }
const cap_dox_config = {
      "schemaName": "SAP_invoice_schema",
      "clientId": "default",
      "documentType": "invoice"
    };

async function createPdfFile(pdfBuffer, outputPath) {


 /// pdfBuffer = decode(pdfBuffer);

  


   //pdfBuffer = pdfBuffer.replace(/^data:application\/pdf;base64,/, '');

        // Convert the Base64 string to a Buffer

        // const arrayBuffer = await pdfBuffer.arrayBuffer();
        //       pdfBuffer   = Buffer.from(arrayBuffer);
       //pdfBuffer = Buffer.from(pdfBuffer.Buffer, 'base64');

      // var buffer = Buffer.from(pdfBuffer, 'base64');

      //     pdfBuffer = buffer.buffer;


  return new Promise((resolve, reject) => {
    fs.writeFile(outputPath, pdfBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(outputPath);
      }
    });
  });
}

async function setbody(pdf, fileName, auth_token) {


  let mydata = new FormData();
//  fileName = './' + fileName;

//  log(" setbody CAP_DOX Extraction- post_job" + fileName);

//  log(" setbody CAP_DOX Extraction- post_job" + pdf);

 // var reader = new FileReader();
 // pdf = reader.FileReader().blob();

  // await fetch(dataURL)
  // .then(res => res.blob())
  // .then(res=> {
  //   console.log("blob: "+res)
  //   blobres = res;    
  // });
   // await createPdfFile(pdf, fileName);
   // mydata.append('file', fs.createReadStream(fileName));
    //  mydata.append('file', pdf,fileName);
      
     //  const pdfn = new Blob([pdf], { type: 'application/pdf' })

   //  const byteArray = Buffer.from(pdf, 'base64');
       //  pdf = pdf.transformToString("base64");
   //  const pdfByteArray = await pdf.transformToByteArray();
    // log(" CAP_DOX Extraction- pdfByteArray" + pdfByteArray);


    //   const chunks = [];
    //   var buffer;
    // pdf.on('data', chunk => chunks.push(chunk));
    // pdf.on('end', () => {
    //      buffer = Buffer.concat(chunks);
    //      log(" CAP_DOX Extraction- buffer-methds" + buffer);
    //     // Now 'buffer' can be passed to the function expecting Buffer, ArrayBuffer, or Array
    //     // Or, convert to string if needed: const content = buffer.toString('utf8');
    // });
    // pdf.on('error', err => {
    //     console.error('Error reading stream:', err);
    // });
      
     // let buffer1 = Buffer.from(pdf);
     // const buffer = Buffer.from(buffer, 'base64');

      //log(" CAP_DOX Extraction- buffer" + buffer);
     // pdf = await streamToBuffer(pdf);
        pdf = await buffer(pdf);
        await createPdfFile(pdf, fileName);
      mydata.append('file', fs.createReadStream(fileName));
     // mydata.append('file', buffer,fileName);
     // mydata.append('file', buffer,fileName);
     //  mydata.append('file', pdfn,fileName);

  cap_dox_job = {
    "schemaId": await get_schema(auth_token),
    "clientId": cap_dox_config.clientId,
    "documentType": cap_dox_config.documentType
  }
  mydata.append('options', JSON.stringify(cap_dox_job, null, 2))
  // log(mydata)
  return mydata


    // let mydata = new FormData();
    // fileName = './' + fileName;
    // log(" before setbody CAP_DOX Extraction- post_job--createPdfFile" );
    // await createPdfFile(pdf, fileName);
    // log(" after setbody CAP_DOX Extraction- post_job-- createPdfFile" );
    // mydata.append('file', fs.createReadStream(fileName));

    // const blob = new Blob([pdf], {
    //     type: 'pdf'
    //   });

    //   var binaryString = atob(pdf);
    // var bytes = new Uint8Array(binaryString.length);
    // for (var i = 0; i < binaryString.length; i++) {
    //     bytes[i] = binaryString.charCodeAt(i);
    // }
   // return bytes.buffer;

    //  await createPdfFile(bytes, fileName);

    // mydata.append('file', bytes,fileName);

    // cap_dox_job = {
    //   "schemaId": await get_schema(auth_token),
    //   "clientId": cap_dox_config.clientId,
    //   "documentType": cap_dox_config.documentType
    // }
    // mydata.append('options', JSON.stringify(cap_dox_job, null, 2))
    // // log(mydata)
    // return mydata


}

async function get_token() {

//  log("Starting CAP_DOX Extraction " + 'in get_token')
  var basic_auth = cap_dox_key.uaa.clientid + ':' + cap_dox_key.uaa.clientsecret
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: cap_dox_key.uaa.url + '/oauth/token?grant_type=client_credentials',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(basic_auth).toString('base64'),
      'Accept': 'application/json'
    }
  };
  let access_token = '';
  access_token = await axios.request(config)
    .then((response) => {
      console.log('Oauth Token Fetched')
    //  log("Starting CAP_DOX Extraction " + 'in get_token feteched')
      return response.data.access_token;
    })
    .catch((error) => {
      log(error);
    });
  return 'Bearer ' + access_token;
}

async function get_schema(auth_token) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: cap_dox_key.endpoints.backend.url + cap_dox_key.swagger + 'schemas?clientId=' + cap_dox_config.clientId,
    headers: {
      'Authorization': auth_token,
      'Accept': 'application/json'
    }
  };

  let schemaId = '';
  schemaId = await axios.request(config)
    .then((response) => {
      for (let item of response.data.schemas) {
        // log('------------',item,'-------------',item.documentType)
        if ((item.name === cap_dox_config.schemaName) && (item.documentType === cap_dox_config.documentType)) {
          return item.id;
        }
      }
    })
    .catch((error) => {
      log(error);
    });
  log('Schema ID: ', schemaId)
  return schemaId;
}

async function post_job(pdf, fileName, auth_token) {
  // PDF file store in local
  var job_data = await setbody(pdf, fileName, auth_token);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: cap_dox_key.endpoints.backend.url + cap_dox_key.swagger + 'document/jobs',
    headers: {
      'Authorization': auth_token,
      'Accept': 'application/json'
    },
    data: job_data
  };

  let job_id = '';
  job_id = await axios.request(config)
    .then((response) => {
     // log('JOB Post ID: ------------------>')
      log('JOB Post ID:' + JSON.stringify(response.data.id));
      return response.data.id;
    })
    .catch((error) => {
      log(error);
    });

    log("Exiting post_job ");
  return job_id;
}

async function get_job_status(job_id, auth_token) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: cap_dox_key.endpoints.backend.url + cap_dox_key.swagger + 'document/jobs/' + job_id,
    headers: { 'Authorization': auth_token }
  };

  var retry_count = 0;
  for (; ;) {

    var job_details = await axios.request(config)
      .then((response) => {
        log('JOB Status: --->', JSON.stringify(response.data.status));
        return response.data;
      })
      .catch((error) => {
        log(error);
      });

    try {
      var job_status = job_details.status;
      if (job_status) {
        if (job_status === 'DONE') {
          return job_details
        }
        else {
          // await setTimeout(() =>{ console.log('5 seconds have passed!'); }, 5000);
          retry_count = retry_count + 1;
          if (retry_count > 500) {
            return job_details
          }
        }
      }
    }
    catch (err) {
      log(JSON.stringify(err))
    }

  }
}

async function entity_mapping_head_def(headerFields, entity) {
  for (let item of headerFields) {
    entity[item.name] = item.rawValue
  //  log('Value Mapped \n', item.name, '--->', item.rawValue);
  }
  return entity
}

async function entity_mapping_item_def(lineItems, entity) {
 // log('Started mapping items.')
 // log('entity: ', entity)
  try {
    let entity_properties = [];
    for (const key in entity) {
      const value = entity[key];
      let valueType;

      if (Array.isArray(value)) {
        valueType = 'array';
      } else if (value === null) {
        valueType = 'null';
      } else {
        valueType = typeof value;
      }
      if (valueType === 'array') {
        let entity_items = [];
        
        for (let item of lineItems) {
          // log('Single Item: ', item);
          let entity_item = {};
          for (let item_properties of item) {
            entity_item[item_properties.name] = item_properties.rawValue
          }
          entity_items.push(entity_item)
        }
      //  log('entity_items:');
      //  log(entity_items);
        entity[key] = entity_items;
      //  log(entity);
      }
    }
  }
  catch (err) {
    log(err)
  }
  // log(entity_items);
  return entity;
}

module.exports = {
  auth_token: async function () {
    return await get_token();
  },
  schema_id: async function () {
    return await get_schema();
  },
  post_job: async function (pdf, fileName, auth_token) {
    return await post_job(pdf, fileName, auth_token)
  },
  get_job_status: async function (job_id, auth_token) {
    return await get_job_status(job_id, auth_token);
  },
  entity_mapping_head: async function (dox_output, entity) {
    return await entity_mapping_head_def(dox_output, entity)
  },
  entity_mapping_item: async function (dox_output, entity) {
    return await entity_mapping_item_def(dox_output, entity)
  }
}
