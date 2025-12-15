

using { Media.db as db } from '../db/media';

  // Define a service named MediaFile
  service MediaFile @(path: '/media') {

    entity MediaFile as projection on db.MediaFile;
    entity  InvoiceHeaders as projection on db.InvoiceHeaders;
    entity  InvoiceItems as projection on db.InvoiceItems;
  
    
    action uploadFile(file: LargeBinary,fileName:String) returns { invoice: {}};
  
  }


