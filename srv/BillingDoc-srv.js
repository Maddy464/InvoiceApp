

// const cds = require('@sap/cds');

// module.exports = async (srv) => 
// {        
//     // Using CDS API     
//    // const { A_BillingDocument } = this.entities; 
//     const BillDoc = await cds.connect.to('API_BILLING_DOCUMENT_SRV'); 
//     srv.on('READ', 'A_BillingDocument', (req) => BillDoc.run(req.query)); 

// }



 const cds = require('@sap/cds');

const LOG = cds.log("dataload");

class BillingDocService extends cds.ApplicationService {

     async init() {

     this.on('generatePdf', this.getBiilingDoc);

     const { ZBillingDocument } = this.entities;
     this.on('READ', ZBillingDocument,      async (req) => { 

        const S4BillDoc = await cds.connect.to('API_BILLING_DOCUMENT_SRV');
        // LOG.info("READ S4BillDoc");
        //  const tx  = S4BillDoc.tx(req);
        //  return  tx.run(req.query);
       // return S4BillDoc.run(req.query);
     });

     //  const BillDoc = await cds.connect.to('API_BILLING_DOCUMENT_SRV'); 
      //  const tx  = BillDoc.tx(req);
      //        return  tx.run(req.query);
      
        // Your custom logic here
      //  console.log('A create event occurred for MyEntity');
        // Example: await INSERT.into(MyEntity).entry(req.data);
   // });

   //   async (req) => { 

   //      this.S4BillDoc = await cds.connect.to('API_BILLING_DOCUMENT_SRV');
   //      LOG.info("READ S4BillDoc");
   //       const tx  = S4BillDoc.tx(req);
   //       return  tx.run(req.query);
   //     // return S4BillDoc.run(req.query);
   //   }


     return super.init();

     }

      generatePdf(req) {

          
         log("Generate PDF ACtion Triggered")


      }


}
module.exports = BillingDocService

