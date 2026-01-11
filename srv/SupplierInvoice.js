const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const SupplierInvoice = await cds.connect.to("SupplierInvoice"); 
      srv.on('READ', 'A_SupplierInvoice', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SupplierInvoiceItemAsset', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SupplierInvoiceItemMaterial', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SuplrInvcSeldSrvcEntrShtLean', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SuplrInvcSeldPurgDocument', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SuplrInvoiceAdditionalData', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_BR_SupplierInvoiceNFDocument', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SuplrInvcHeaderWhldgTax', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SuplrInvcItemPurOrdRef', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SuplrInvcItemAcctAssgmt', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SuplrInvcSeldInbDeliveryNote', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SupplierInvoiceODN', req => SupplierInvoice.run(req.query)); 
      srv.on('READ', 'A_SupplierInvoiceTax', req => SupplierInvoice.run(req.query)); 
}