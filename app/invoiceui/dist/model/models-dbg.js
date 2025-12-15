sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
function (JSONModel, Device) {
    "use strict";

    return {
        /**
         * Provides runtime information for the device the UI5 app is running on as a JSONModel.
         * @returns {sap.ui.model.json.JSONModel} The device model.
         */
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
             createUiModel: function () {
            const oViewModel = new JSONModel({
                CustomerScreen: {},
                salesOrderFields:{
                    PurOrdNum: "",
                    Op1:"",
                    Op2: "" ,
                    Op3: "",
                    ReqDelDate:"",
                    Date: new Date(),
                    Time: "",
                    TotAmt: "",
                    TotDisc: "",
                    TotQuant: ""

                },
                IsMaterialExist: false,
                tableDetials:[],
            freeItemDetails:[],
            bulkItemDetails:[], // Enhancement Add by Mahesh
            FocQuantity: 0,
            messageStatus: {},
            F4Help: {},
            F4HelpPlant: {},
            mData : [  
                {key:"1",text:"Next Week",Country:"USA"},  
               {key:"2",text:"Next Month",Country:"England"},  
               {key:"3",text:"Tomorrow",Country:"Africa"}  
           ],
           mVal: "1"
            });
			return oViewModel;

        }
    };

});