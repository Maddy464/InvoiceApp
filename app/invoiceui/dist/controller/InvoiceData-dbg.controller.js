sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/ui/core/routing/History"
], (Controller, JSONModel, MessageToast, History) => {
  "use strict";

  return Controller.extend("invoiceui.controller.InvoiceData", {
    onInit() {




    },

    onListRefresh:function (oEvent) {

      var oList = this.byId("emplist");
      oList.getBinding("items").refresh();

    },

    onListUpdateFinished: function (oEvent) {

      let oTable = this.byId("items1");
      let oItemTemplate = this.getView().byId('_IDGenColumnListItem11').clone();
       oTable.bindItems(oEvent.getSource().getItems()[0].getBindingContext().sPath+"/to_items", oItemTemplate);

      // oTable.bindAggregation("items", {
      //   path: "/InvoiceHeaders(3effb87c-6d8a-4f83-973a-e3f22dcfca91)/to_items"       // Path to the collection in the model
      //   // template: oItemTemplate , // The template to use for each item
      //   // templateShareable: true
      // });

     // oTable.bindItems(path, oTemplate);

     


    },

    onObjectItemPress: function (oEvent) {

      var oTable = this.byId("items1");
      var oItemTemplate = this.getView().byId('_IDGenColumnListItem11').clone();
      oTable.bindItems(oEvent.getSource().getBindingContext().sPath+"/to_items", oItemTemplate)


      // oTable.bindAggregation("items", {
      //   path: "/InvoiceHeaders(3effb87c-6d8a-4f83-973a-e3f22dcfca91)/to_items"       // Path to the collection in the model
      //   // template: oItemTemplate , // The template to use for each item
      //   // templateShareable: true
      // });

     // oTable.bindItems(path, oTemplate);

      

      


      var test = 'test';

    },

    onNavBack: function () {
      const sPreviousHash = History.getInstance().getPreviousHash();
      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        this.getOwnerComponent().getRouter().navTo("RouteUpload", {}, undefined, true);
      }
    }




  })

})