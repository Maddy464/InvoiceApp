
using {API_BILLING_DOCUMENT_SRV as BillDoc} from './external/API_BILLING_DOCUMENT_SRV';


service BillingDocService {

    entity ZBillingDocument as projection on BillDoc.A_BillingDocument;
    
    
    //action Cancel() returns many CancelResult;
     action generatePdf (BillingDoc:String) returns LargeBinary;

   
  
   

  

        


}