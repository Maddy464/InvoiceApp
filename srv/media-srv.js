
//const SequenceHelper = require("./library/SequenceHelper");
const { Readable, PassThrough } = require("stream");
const { Destinations } = require('@sap/cloud-sdk-core');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const cds = require('@sap/cds')

const { log } = require("console");
const cap_doxlib = require("./library/lib_cap_dox");
// const cap_dox_key = cds.env.cap_dox_key
// const cap_dox_config = cds.env.cap_dox_config

module.exports = cds.service.impl(async function () {

  this.on('uploadFile', async (req) => {
    const fileContent = req.data.file;
    const fileName = req.data.fileName;
    var invoice = {};

    log("Starting CAP_DOX Extraction file ", req.data.fileName)

     log("Starting CAP_DOX Extraction ")
    let auth_token = await cap_doxlib.auth_token();
    let job_id = await cap_doxlib.post_job(fileContent, fileName, auth_token);
    if (job_id) {
      let dox_output = await cap_doxlib.get_job_status(job_id, auth_token);
      try {
        if (dox_output.status === 'DONE') {
          log("Job Status dox_output---DONE")
          //set header
          const invoiceHeader = dox_output.extraction.headerFields.reduce((acc, curr) => {
            acc[curr.name] = curr.value;
            return acc;
          }, {});

         // log('Invoice Header Data ::--->', invoiceHeader)
          //set items
          const invoiceItems = dox_output.extraction.lineItems.reduce((acc, item) => {
            const lineItem = item.reduce((acc, curr) => {
              acc[curr.name] = curr.value;
              return acc;
            }, {});
            acc.push(lineItem);
            return acc;
          }, []);
       //   log('Invoice Line Items Data ::--->', invoiceItems)
          invoice["header"] = invoiceHeader;
          invoice["items"] = invoiceItems;

          // code ends
      
        }
      }
      catch {
        log('something happened')
      }
    }
    else {
      log('Problem faced. Check JOBID: ', job_id);
    }



    // Process the fileContent here (e.g., save to database, send to external service)
   // log("Received file content:", fileContent);
    // Add your logic for handling the uploaded file

     log('Problem faced. Check JOBID:- invoice ', invoice);

    return {invoice };

  });


  const {
    MediaFile
  } = this.entities;

  //app.use(express.json({ limit: '20mb' })); // Adjust limit as needed


  /**
   * Handler method called before creating data entry
   * for entity Mediafile.
   */
  this.before('CREATE', MediaFile, async data => {

    var invoice = {};
     log("Starting CAP_DOX Extraction ")
    let auth_token = await cap_doxlib.auth_token();
    let job_id = await cap_doxlib.post_job(data.data.content, data.data.fileName, auth_token);
    if (job_id) {
      let dox_output = await cap_doxlib.get_job_status(job_id, auth_token);
      try {
        if (dox_output.status === 'DONE') {
          log("Job Status dox_output---DONE")
          //set header
          const invoiceHeader = dox_output.extraction.headerFields.reduce((acc, curr) => {
            acc[curr.name] = curr.value;
            return acc;
          }, {});

          log('Invoice Header Data ::--->', invoiceHeader)
          //set items
          const invoiceItems = dox_output.extraction.lineItems.reduce((acc, item) => {
            const lineItem = item.reduce((acc, curr) => {
              acc[curr.name] = curr.value;
              return acc;
            }, {});
            acc.push(lineItem);
            return acc;
          }, []);

          log('Invoice Line Items Data ::--->', invoiceItems)
          invoice["header"] = invoiceHeader;
          invoice["items"] = invoiceItems;

          // code ends          
        }
      }
      catch {
        log('something happened')
      }
    }
    else {
      log('Problem faced. Check JOBID: ', job_id);
    }


    // const db = await cds.connect.to("db");

    // microsoft API's start

    //app.use(express.json({ limit: '20mb' })); // Adjust limit as needed



    // log('MS_GRAPH_MAIL -before');

    // const MS_GRAPH_MAILService = await cds.connect.to('MS_GRAPH_MAIL'); // Replace with your destination name  
    // log('MS_GRAPH_MAIL -after');


    //       try {

    //       const response = await MS_GRAPH_MAILService.get('/v1.0/users/79d54adb-28c2-409b-b635-ce18351fa526/messages');    // Fetch users from Microsoft Graph        


    //    // /v1.0/users/mahesh.narkuda@outlook.com/messages

    //    // /v1.0/users/79d54adb-28c2-409b-b635-ce18351fa526/messages



    //       log('MS_GRAPH_MAIL -before' + response.value);
    //       return response.value; // Return the array of users


    //     } catch (error) {
    //       console.error('Error fetching users from Microsoft Graph:', error);
    //       req.error(500, 'Failed to fetch users');
    //     }

    // let destination = 'MSGraph'
    // const url = `https://graph.microsoft.com/v1.0/users/`
    // const service = await cds.connect.to('MS_GRAPH_MAIL'); 
    // const graphUser = await service.run({
    //   url: url
    // })

    // log('MS_GRAPH_MAIL graphUser -after');

    // let users = graphUser.value.map(graph_user => {

    //   log('MS_GRAPH_MAIL graphUser -after' + users.aad_id);
    //   var user = {}
    //   user.aad_id = graph_user.id
    //   user.username = graph_user.userPrincipalName
    //   user.displayName = graph_user.displayName
    //   user.givenName = graph_user.givenName
    //   user.surname = graph_user.surname
    //   user.isAzureActiveDirectory = true
    //   return user
    // })
    // return users




    // //  const destination = await Destinations.from('MS_GRAPH_MAIL'); // Use the name of your created destination

    //     const token1 = await getAccessToken();



    //   const graphApiBaseUrl = 'https://graph.microsoft.com/v1.0';
    //   const endpoint = `${graphApiBaseUrl}/me/messages`; // Endpoint to get messages for the authenticated user

    //   // Get the access token from the destination
    //   log('Get the access token from the destination');
    //  // const token = await destination.authenticate();

    //   log('Get the access token from the destination--auth token');
    //   const response = await fetch(endpoint, {
    //     headers: {
    //       'Authorization': `Bearer + ${token1}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   log('Get the access token from the destination--authorztion');

    //   if (!response.ok) {
    //     log('Get the access token from the destination--error');
    //     const error = await response.json();
    //     throw new Error(`Failed to read Outlook emails: ${JSON.stringify(error)}`);
    //   }

    //   const data = await response.json();
    //   log('Get the access token from the destination--data feteched');
    //   // Process and return the emails from data.value
    //   return data.value;

    // } catch (error) {
    //   console.error('Error reading Outlook emails:', error);
    //   req.error(500, `Failed to read Outlook emails: ${error.message}`);
    // }




    // try {

















    //MIcrosft API ENd






















    // const { content } = data; // Assuming documentContent is Base64

    // log("Starting CAP_DOX Extraction--data.data.fileName " + data.data.fileName);
    // log("Starting CAP_DOX Extraction--data.data.pdf " + data.data.pdf);

    // log("Starting CAP_DOX Extraction--data.data.content " + data.data.content);


    // var reader = new FileReader();

    // var reader = new FileReader();
    //pdf = data.params.file;


    //const blob = new Blob([data.data.content], { type: 'pdf' })

    // log("Starting CAP_DOX Extraction--data.blob " + blob);

    //pdf =     new Blob([pdf]);


    

    //log("Starting CAP_DOX Extraction--data.data " + data.data)

    // log("Job Status dox_output--data.data.pdf-" + data.data.pdf )
    //  const readable = new Readable();
    // const result = new Array();
    // readable.push(decodedMedia);
    // readable.push(null);


    //        var latestdata = data.data.content;
    //       latestdata = latestdata.split(',')[1] || latestdata;

    //    log(" Before CAP_DOX Extraction- post_job + Buffer" );
    //   let b64 = Buffer.isBuffer(latestdata) ? null : String(latestdata);
    //   if (b64 && b64.startsWith("data:")) {
    //     const i = b64.indexOf("base64,");
    //     if (i > -1) b64 = b64.slice(i + "base64,".length);
    //  }
    //  const buffer = Buffer.isBuffer(latestdata) ? latestdata : Buffer.from(b64 || latestdata, "base64");
    //  log(" After CAP_DOX Extraction- post_job + Buffer" );
    //  //console.log("[CHECK] filename=", filename, "buffer length=", buffer?.length);
    //   if (!buffer?.length) return req.error(400, "Empty or invalid base64 file");


    // const fileBuffer = Buffer.from(data.data.content, 'base64');


    // log(" Before CAP_DOX Extraction- post_job"  + fileBuffer)
    // let job_id = await cap_doxlib.post_job(data.data.content, data.data.fileName, auth_token);

    //  const bufferstr = Buffer.from(data.data.content.buffer, 'base64');


    //      // 2. Access the underlying ArrayBuffer
    //       const arrayBuffer = bufferstr.buffer

    //       // Now 'arrayBuffer' can be used for further processing,
    //       // such as writing to a file, sending to another service, etc.
    //       console.log("ArrayBuffer created:", arrayBuffer);

    //       // Example: If you need a specific typed array view
    //       const uint8Array = new Uint8Array(arrayBuffer);

    // let job_id = await cap_doxlib.post_job(data.data.content, data.data.fileName, auth_token);
    



    // readable.push(null);
  

    // const formData = new FormData()

    //	formData.append("file", blob, req.data.fileName)


    // Create Constructor for SequenceHelper 
    // Pass the sequence name and db
    // const SeqReq = new SequenceHelper({
    //     sequence: "MEDIA_ID",
    //     db: db,
    // });
    //Call method getNextNumber() to fetch the next sequence number 
    //   let seq_no = await SeqReq.getNextNumber();
    // Assign the sequence number to id element
    //  req.data.id = Math.random();
    //Assign the url by appending the id
    //  req.data.url = `/media/MediaFile(${req.data.id})/content`;


    // SAP BPA Starts

    //SAP BPA start

    // log('bpa_destination -before');

    // const bpaService = await cds.connect.to('bpa_destination'); // Replace with your destination name  
    // log('bpa_destination -after');

    // try {

    //   var startContext = { "POId": "300001909" };
    //   var workflowStartPayload = { definitionId: "com.demowf", context: startContext }

    //   // const payload = {
    //   //     definitionId: 'YOUR_BPA_PROCESS_DEFINITION_ID', // Get this from your BPA process details
    //   //     context: {
    //   //         orderId: orderId,
    //   //         amount: amount
    //   //     }
    //   // };

    //   const response = await bpaService.send('POST', '/v1/workflow-instances', JSON.stringify(workflowStartPayload), {
    //     'Content-Type': 'application/json'
    //   });

    //   log('bpa_destination -response');

    //   log('BPA Process Triggered:', response);
    //   return 'BPA process triggered successfully!';
    // } catch (error) {
    //   console.error('Error triggering BPA process:', error);
    //   // req.error(500, 'Failed to trigger BPA process.');
    // }



    //SAP BPA ends




    // SAP BPA Ends

   // return invoice;

  });






  /**
   * Handler method called on reading data entry
   * for entity Mediafile.
   **/


  this.on("READ", MediaFile, async (req, next) => {
    if (!req.data.ID) {
      return next();
    }
    //Fetch the url from where the req is triggered
    const url = req._.req.path;
    //If the request url contains keyword "content"
    // then read the media content
    if (url.includes("content")) {
      const id = req.data.ID;
      var tx = cds.transaction(req);
      // Fetch the media obj from database
      var mediaObj = await tx.run(
        SELECT.one.from("Media.db.MediaFile", ["content", "mediaType"]).where(
          "ID =",
          id
        )
      );
      if (mediaObj.length <= 0) {
        req.reject(404, "Media not found for the ID");
        return;
      }
      var decodedMedia = "";
      decodedMedia = new Buffer.from(
        mediaObj.content.toString().split(";base64,").pop(),
        "base64"
      );


      // start

      log("Starting CAP_DOX Extraction ")
      let auth_token = await cap_doxlib.auth_token();

      //log("Starting CAP_DOX Extraction--data.data " + data.data)

      // log("Job Status dox_output--data.data.pdf-" + data.data.pdf )
      const readable = new Readable();
      const result = new Array();
      readable.push(decodedMedia);
      readable.push(null);

      let job_id = await cap_doxlib.post_job(mediaObj, "Sample.pdf", auth_token);
      // readable.push(null);

      //  log("Job ID Received ---" + '${job_id}')
      if (job_id) {
        let dox_output = await cap_doxlib.get_job_status(job_id, auth_token);
        log("Job Status dox_output---" + '${dox_output}')
        try {
          if (dox_output.status === 'DONE') {
            log("Job Status dox_output---DONE")
            data.data = await cap_doxlib.entity_mapping_head(dox_output.extraction.headerFields, data.data)
            log('Data.Data Headers data::--->', data.data)
            let data_with_items = await cap_doxlib.entity_mapping_item(dox_output.extraction.lineItems, data.data)
            if (data_with_items) {
              data.data = data_with_items;
            }
            log('data_with_items::--->', data_with_items)
          }
        }
        catch {
          log('something happened')
        }
      }
      else {
        log('Problem faced. Check JOBID: ', job_id);
      }















      //end

      return _formatResult(decodedMedia, mediaObj.mediaType);
    } else return next();
  });

  function _formatResult(decodedMedia, mediaType) {
    const readable = new Readable();
    const result = new Array();
    readable.push(decodedMedia);
    readable.push(null);
    return {
      value: readable,
      '*@odata.mediaContentType': mediaType
    }
  }


  // access token



  async function getAccessToken() {

    log('Get the access token ');
    const tenantId = 'c9c6749c-7215-47f0-924b-81a209751495';
    const clientId = '127e2db6-b395-419a-9a86-2f0f6d2524fb';
    const clientSecret = 'xKC8Q~rvswZuSbvma54xgA98-VgN77lLOiQeocIL';
    const scope = 'https://graph.microsoft.com/.default'; // For application permissions

    const tokenEndpoint = `https://login.microsoftonline.com/c9c6749c-7215-47f0-924b-81a209751495/oauth2/v2.0/token`;

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `client_id=${clientId}&scope=${scope}&client_secret=${clientSecret}&grant_type=client_credentials`
    });

    log('Get the access token 1');

    const data = await response.json();
    log('Get the access token 2 {data.access_token}', response.json());
    return data.access_token;
  }


  async function get_token() {

    const tenantId = 'c9c6749c-7215-47f0-924b-81a209751495';
    const clientId = '127e2db6-b395-419a-9a86-2f0f6d2524fb';
    const clientSecret = 'xKC8Q~rvswZuSbvma54xgA98-VgN77lLOiQeocIL';
    const scope = 'https://graph.microsoft.com/.default'; // For application permissions

    // const tokenEndpoint = `https://login.microsoftonline.com/c9c6749c-7215-47f0-924b-81a209751495/oauth2/v2.0/token`;

    log("Starting CAP_DOX Extraction " + 'in get_token')
    var basic_auth = clientId + ':' + clientSecret;
    const tokenEndpoint = `https://login.microsoftonline.com/c9c6749c-7215-47f0-924b-81a209751495`;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: tokenEndpoint + '/oauth/v2.0/token?grant_type=client_credentials',
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









  //end






});
