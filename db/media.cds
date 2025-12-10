namespace Media.db;

using {cuid} from '@sap/cds/common';


entity MediaFile : cuid {

    @Core.ContentDisposition.Filename: fileName
    @Core.MediaType                  : mediaType

    content   : LargeBinary;
    fileName  : String;
    mediaType : String;
    url       : String;

}

entity InvoiceHeaders {
    key ID                       : UUID;
        documentNumber           : String;
        taxId                    : String;
        taxName                  : String;
        purchaseOrderNumber      : String;
        shippingAmount           : Decimal(10,3);
        netAmount                : Decimal(10,3);
        grossAmount              : Decimal(10,3);
        currencyCode             : String;
        receiverContact          : String;
        documentDate             : Date;
        taxAmount                : Decimal(10,3);
        taxRate                  : Decimal(10,3);
        receiverName             : String;
        receiverAddress          : String;
        receiverTaxId            : String;
        deliveryDate             : Date;
        paymentTerms             : String;
        deliveryNoteNumber       : String;
        senderBankAccount        : String;
        senderAddress            : String;
        senderName               : String;
        dueDate                  : Date;
        discount                 : String;
        barcode                  : String;
        receiverStreet           : String;
        receiverCity             : String;
        receiverHouseNumber      : String;
        receiverPostalCode       : String;
        receiverCountryCode      : String;
        receiverState            : String;
        receiverDistrict         : String;
        receiverExtraAddressPart : String;
        senderStreet             : String;
        senderCity               : String;
        senderHouseNumber        : String;
        senderPostalCode         : String;
        senderCountryCode        : String;
        senderState              : String;
        senderDistrict           : String;
        senderExtraAddressPart   : String;
        to_items                 : Association to many InvoiceItems
                                       on to_items.parent = $self;
}

entity InvoiceItems {
    key ID                : UUID;
        parent            : Association to InvoiceHeaders;
        description       : String;
        netAmount         : Decimal(10,3);
        quantity          : Integer;
        unitPrice         : Decimal(10,3);
        materialNumber    : String;
        unitOfMeasure     : String;

}
