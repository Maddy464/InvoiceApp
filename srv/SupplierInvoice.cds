using SupplierInvoice from './external/SupplierInvoice.cds';

service SupplierInvoiceSampleService {
    @readonly
    entity ZA_SupplierInvoice as projection on SupplierInvoice.A_SupplierInvoice
    {        key SupplierInvoice, key FiscalYear, CompanyCode, DocumentDate, PostingDate, CreationDate, SuplrInvcLstChgDteTmeTxt, SupplierInvoiceIDByInvcgParty, InvoicingParty, DocumentCurrency, InvoiceGrossAmount, UnplannedDeliveryCost, DocumentHeaderText, ReconciliationAccount, ManualCashDiscount, PaymentTerms, DueCalculationBaseDate, CashDiscount1Percent, CashDiscount1Days, CashDiscount2Percent, CashDiscount2Days, NetPaymentDays, PaymentBlockingReason, AccountingDocumentType, BPBankAccountInternalID, SupplierInvoiceStatus, IndirectQuotedExchangeRate, DirectQuotedExchangeRate, StateCentralBankPaymentReason, SupplyingCountry, PaymentMethod, PaymentMethodSupplement, PaymentReference, InvoiceReference, InvoiceReferenceFiscalYear, FixedCashDiscount, UnplannedDeliveryCostTaxCode, UnplndDelivCostTaxJurisdiction, UnplndDeliveryCostTaxCountry, AssignmentReference, SupplierPostingLineItemText, TaxIsCalculatedAutomatically, BusinessPlace, BusinessSectionCode, BusinessArea, SuplrInvcIsCapitalGoodsRelated, SupplierInvoiceIsCreditMemo, PaytSlipWthRefSubscriber, PaytSlipWthRefCheckDigit, PaytSlipWthRefReference, TaxDeterminationDate, TaxReportingDate, TaxFulfillmentDate, InvoiceReceiptDate, DeliveryOfGoodsReportingCntry, SupplierVATRegistration, IsEUTriangularDeal, SuplrInvcDebitCrdtCodeDelivery, SuplrInvcDebitCrdtCodeReturns, RetentionDueDate, PaymentReason, HouseBank, HouseBankAccount, AlternativePayeePayer, SupplierInvoiceOrigin, ReverseDocument, ReverseDocumentFiscalYear, IsReversal, IsReversed, SupplierInvoicePaymentStatus, IN_GSTPartner, IN_GSTPlaceOfSupply, IN_InvoiceReferenceNumber, JrnlEntryCntrySpecificRef1, JrnlEntryCntrySpecificDate1, JrnlEntryCntrySpecificRef2, JrnlEntryCntrySpecificDate2, JrnlEntryCntrySpecificRef3, JrnlEntryCntrySpecificDate3, JrnlEntryCntrySpecificRef4, JrnlEntryCntrySpecificDate4, JrnlEntryCntrySpecificRef5, JrnlEntryCntrySpecificDate5, JrnlEntryCntrySpecificBP1, JrnlEntryCntrySpecificBP2     }    
;
    @readonly
    entity ZA_SupplierInvoiceItemAsset as projection on SupplierInvoice.A_SupplierInvoiceItemAsset
    {        key SupplierInvoice, key FiscalYear, key SupplierInvoiceItem, CompanyCode, MasterFixedAsset, FixedAsset, ProfitCenter, GLAccount, DocumentCurrency, SupplierInvoiceItemAmount, TaxCode, TaxJurisdiction, TaxCountry, TaxDeterminationDate, DebitCreditCode, SupplierInvoiceItemText, AssignmentReference, IsNotCashDiscountLiable, AssetValueDate, QuantityUnit, SuplrInvcItmQtyUnitSAPCode, SuplrInvcItmQtyUnitISOCode, Quantity     }    
;
    @readonly
    entity ZA_SupplierInvoiceItemMaterial as projection on SupplierInvoice.A_SupplierInvoiceItemMaterial
    {        key SupplierInvoice, key FiscalYear, key SupplierInvoiceItem, Material, ValuationArea, CompanyCode, Plant, InventoryValuationType, TaxCode, TaxJurisdiction, TaxCountry, TaxDeterminationDate, DocumentCurrency, SupplierInvoiceItemAmount, QuantityUnit, SuplrInvcItmQtyUnitSAPCode, SuplrInvcItmQtyUnitISOCode, Quantity, DebitCreditCode, IsNotCashDiscountLiable     }    
;
    @readonly
    entity ZA_SuplrInvcSeldSrvcEntrShtLean as projection on SupplierInvoice.A_SuplrInvcSeldSrvcEntrShtLean
    {        key SupplierInvoice, key FiscalYear, key ServiceEntrySheet, key ServiceEntrySheetItem     }    
;
    @readonly
    entity ZA_SuplrInvcSeldPurgDocument as projection on SupplierInvoice.A_SuplrInvcSeldPurgDocument
    {        key SupplierInvoice, key FiscalYear, key PurchaseOrder, key PurchaseOrderItem     }    
;
    @readonly
    entity ZA_SuplrInvoiceAdditionalData as projection on SupplierInvoice.A_SuplrInvoiceAdditionalData
    {        key SupplierInvoice, key FiscalYear, InvoicingPartyName1, InvoicingPartyName2, InvoicingPartyName3, InvoicingPartyName4, PostalCode, CityName, Country, StreetAddressName, POBox, POBoxPostalCode, PostOfficeBankAccount, BankAccount, Bank, BankCountry, TaxID1, TaxID2, TaxID3, TaxID4, TaxID5, OneTmeAccountIsVATLiable, OneTmeAcctIsEqualizationTxSubj, Region, BankControlKey, DataExchangeInstructionKey, DataMediumExchangeIndicator, LanguageCode, IsOneTimeAccount, PaymentRecipient, AccountTaxType, TaxNumberType, IsNaturalPerson, BankDetailReference, RepresentativeName, BusinessType, IndustryType, FormOfAddressName, VATRegistration, OneTimeAcctCntrySpecificRef1, IBAN, SWIFTCode, OneTimeBusinessPartnerEmail     }    
;
    @readonly
    entity ZA_BR_SupplierInvoiceNFDocument as projection on SupplierInvoice.A_BR_SupplierInvoiceNFDocument
    {        key SupplierInvoice, key FiscalYear, BR_NotaFiscal, BR_NFType, BR_NFSNumber, BR_NFSVerificationCode, BR_NFAuthznProtocolNumber, BR_NFAuthznProtocolNumber16, BR_NFAuthenticationDate, BR_NFAuthenticationTime, BR_NFeRandomNumber, IssuingType     }    
;
    @readonly
    entity ZA_SuplrInvcHeaderWhldgTax as projection on SupplierInvoice.A_SuplrInvcHeaderWhldgTax
    {        key SupplierInvoice, key FiscalYear, key WithholdingTaxType, DocumentCurrency, WithholdingTaxCode, WithholdingTaxBaseAmount, ManuallyEnteredWhldgTaxAmount, WhldgTaxIsEnteredManually, WhldgTaxBaseIsEnteredManually     }    
;
    @readonly
    entity ZA_SuplrInvcItemPurOrdRef as projection on SupplierInvoice.A_SuplrInvcItemPurOrdRef
    {        key SupplierInvoice, key FiscalYear, key SupplierInvoiceItem, PurchaseOrder, PurchaseOrderItem, Plant, ReferenceDocument, ReferenceDocumentFiscalYear, ReferenceDocumentItem, IsSubsequentDebitCredit, TaxCode, TaxJurisdiction, DocumentCurrency, SupplierInvoiceItemAmount, PurchaseOrderQuantityUnit, PurchaseOrderQtyUnitSAPCode, PurchaseOrderQtyUnitISOCode, QuantityInPurchaseOrderUnit, PurchaseOrderPriceUnit, PurchaseOrderPriceUnitSAPCode, PurchaseOrderPriceUnitISOCode, QtyInPurchaseOrderPriceUnit, SuplrInvcDeliveryCostCndnType, SuplrInvcDeliveryCostCndnStep, SuplrInvcDeliveryCostCndnCount, SupplierInvoiceItemText, FreightSupplier, IsNotCashDiscountLiable, PurchasingDocumentItemCategory, ProductType, RetentionAmountInDocCurrency, RetentionPercentage, RetentionDueDate, SuplrInvcItmIsNotRlvtForRtntn, ServiceEntrySheet, ServiceEntrySheetItem, TaxCountry, IsFinallyInvoiced, TaxDeterminationDate, IN_HSNOrSACCode, IN_CustomDutyAssessableValue, NL_ChainLiabilityStartDate, NL_ChainLiabilityEndDate, NL_ChainLiabilityDescription, NL_ChainLbltyCnstrctnSiteDesc, NL_ChainLiabilityDuration, NL_ChainLiabilityPercent     }    
;
    @readonly
    entity ZA_SuplrInvcItemAcctAssgmt as projection on SupplierInvoice.A_SuplrInvcItemAcctAssgmt
    {        key SupplierInvoice, key FiscalYear, key SupplierInvoiceItem, key OrdinalNumber, CostCenter, ControllingArea, BusinessArea, ProfitCenter, FunctionalArea, GLAccount, SalesOrder, SalesOrderItem, CostObject, CostCtrActivityType, BusinessProcess, WBSElement, DocumentCurrency, SuplrInvcAcctAssignmentAmount, PurchaseOrderQuantityUnit, PurchaseOrderQtyUnitSAPCode, PurchaseOrderQtyUnitISOCode, Quantity, TaxCode, AccountAssignmentNumber, AccountAssignmentIsUnplanned, PersonnelNumber, WorkItem, MasterFixedAsset, FixedAsset, DebitCreditCode, TaxJurisdiction, InternalOrder, ProjectNetworkInternalID, NetworkActivityInternalID, ProjectNetwork, NetworkActivity, CommitmentItem, FundsCenter, Fund, GrantID, PartnerBusinessArea, CompanyCode, SuplrInvcAccountAssignmentText, PurchaseOrderPriceUnit, PurchaseOrderPriceUnitSAPCode, PurchaseOrderPriceUnitISOCode, QuantityInPurchaseOrderUnit, ProfitabilitySegment, BudgetPeriod, TaxCountry, TaxDeterminationDate     }    
;
    @readonly
    entity ZA_SuplrInvcSeldInbDeliveryNote as projection on SupplierInvoice.A_SuplrInvcSeldInbDeliveryNote
    {        key SupplierInvoice, key FiscalYear, key InboundDeliveryNote     }    
;
    @readonly
    entity ZA_SupplierInvoiceODN as projection on SupplierInvoice.A_SupplierInvoiceODN
    {        key AFDFUniqueKeyUUID, key SupplierInvoice, key FiscalYear, OfficialDocumentNumberCountry, OfficialDocumentNumberType, OfficialDocumentNumber, ODNLegalDateTimeText, OfficialDocumentNumberIntType     }    
;
    @readonly
    entity ZA_SupplierInvoiceTax as projection on SupplierInvoice.A_SupplierInvoiceTax
    {        key SupplierInvoice, key FiscalYear, key TaxCode, key SupplierInvoiceTaxCounter, DocumentCurrency, TaxAmount, TaxBaseAmountInTransCrcy, TaxJurisdiction, TaxCountry, TaxDeterminationDate, TaxRateValidityStartDate     }    
;
}