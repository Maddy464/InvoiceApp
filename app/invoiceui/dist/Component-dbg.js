sap.ui.define([
    "sap/ui/core/UIComponent",
    "invoiceui/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("invoiceui.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // set options Model 


            this.setModel(this.getModel("options"), "invoice");

             // set th ui model
                 this.setModel(models.createUiModel(), "ui");





            // enable routing
            this.getRouter().initialize();
        }
    });
});