const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const cds = require('@sap/cds')
const { Readable } = require('stream');
const { log } = require("console");
const cap_dox_key = {
      "sap.cloud.service": "com.sap.apps.documentinformationextraction",
      "saasregistryenabled": true,
      "html5-apps-repo": {
        "app_host_id": "a64bcab8-c7f6-4fb1-a185-58842a6bd6a2"
      },
      "uaa": {
        "tenantmode": "shared",
        "sburl": "https://internal-xsuaa.authentication.us10.hana.ondemand.com",
        "subaccountid": "fa1a551f-0123-42ba-93a7-40d7970407e5",
        "credential-type": "binding-secret",
        "clientid": "sb-3ac68553-8e2f-40ee-8f22-3d1b0b067fbc!b480857|dox-xsuaa-std-trial!b10844",
        "xsappname": "3ac68553-8e2f-40ee-8f22-3d1b0b067fbc!b480857|dox-xsuaa-std-trial!b10844",
        "clientsecret": "f473d0a0-8d73-4af4-9148-edd44e5a6a0b$SJSFSf-AZvzeS7IDChL3FmxnDpTCQbfp1qQSMbKBnUY=",
        "serviceInstanceId": "3ac68553-8e2f-40ee-8f22-3d1b0b067fbc",
        "url": "https://1a3a103etrial.authentication.us10.hana.ondemand.com",
        "uaadomain": "authentication.us10.hana.ondemand.com",
        "verificationkey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt0Ehwcc9QbYcByg5QcYS\nZsOVYaHzHGDfGbw6OHU4pLKluFCaydkrZEueoWgUXkp5mlan7wfAbh9EftO6di3A\n20WbhhUuuzlDONNFvi98RXyAZGF0HByvUUXDGFVRcIrh5kZJcU6rL2zFmi9XGe34\ncuCfjXtBt5CnFRKB/o6+EsRkhGO6sCWgoF9tQk+96/WVK/86iGhpnDKBAf6gnUnv\ngO5sK2cn38cpUirQcL/GZtsoTAf+9+ECOe4kSBwWgsLxcVChxnmB4RZU1EduyDm2\n/GcK3q6xg367454HJt/T28jDGhmQ1xx55bmxGrge7ozEohQc7prPkF1uDDOH3rmO\nsQIDAQAB\n-----END PUBLIC KEY-----",
        "apiurl": "https://api.authentication.us10.hana.ondemand.com",
        "identityzone": "1a3a103etrial",
        "identityzoneid": "fa1a551f-0123-42ba-93a7-40d7970407e5",
        "tenantid": "fa1a551f-0123-42ba-93a7-40d7970407e5",
        "zoneid": "fa1a551f-0123-42ba-93a7-40d7970407e5"
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
      "tenantuiurl": "https://1a3a103etrial.us10-trial.doc.cloud.sap"
    }
const cap_dox_config = {
      "schemaName": "SAP_invoice_schema",
      "clientId": "default",
      "documentType": "invoice"
    };

async function createPdfFile(pdfBuffer, outputPath) {
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
  fileName = './' + fileName;

 // var reader = new FileReader();
 // pdf = reader.FileReader().blob();

  // await fetch(dataURL)
  // .then(res => res.blob())
  // .then(res=> {
  //   console.log("blob: "+res)
  //   blobres = res;    
  // });
   // await createPdfFile(pdf, fileName);
    mydata.append('file', fs.createReadStream(fileName));
    //  mydata.append('file', pdf,fileName);
      
     //  const pdfn = new Blob([pdf], { type: 'application/pdf' })
      mydata.append('file', pdf,fileName);
     //  mydata.append('file', pdfn,fileName);

  cap_dox_job = {
    "schemaId": await get_schema(auth_token),
    "clientId": cap_dox_config.clientId,
    "documentType": cap_dox_config.documentType
  }
  mydata.append('options', JSON.stringify(cap_dox_job, null, 2))
  // log(mydata)
  return mydata
}

async function get_token() {

  log("Starting CAP_DOX Extraction " + 'in get_token')
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
      log("Starting CAP_DOX Extraction " + 'in get_token feteched')
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
      log('JOB Post ID: ------------------>')
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
          if (retry_count > 100) {
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
