
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("invoiceui.controller.Upload", {
        onInit() {
        },

       

        onCloudDataInt:function (oEvent) {

             // '90027775'

        },

        onTrigger:function (oEvent) {

            var tets = "";

            // this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("errorText"); 
            //this.getOwnerComponent().getModel("invoice").getData()
            //this.getOwnerComponent().getModel("invoice").getProperty("/documentType")
        },

        onNavigateToWfTrigger:function (oEvent) {
             var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteWorkList");  
        },
        onNavigateToInvoiceData:function (oEvent) {
             var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteInvoice");  
        },
        // start of changes
        onCreate: function (oEvent) {
            var oSecondModel = this.getOwnerComponent().getModel();
            var oListBinding = oSecondModel.bindList("/InvoiceHeaders");
            let invoice = this.getView().getModel("invoice").getData();
            // let invoice = {
            //     header: {
            //         senderCity: 'Walldorf-test',
            //         senderExtraAddressPart: 'Postfach 1358',
            //         senderPostalCode: '69185',
            //         paymentTerms: 'Bis zum 15.12.2019 ohne Abzug',
            //         currencyCode: 'EUR',
            //         documentNumber: '601195146',
            //         grossAmount: 34.35,
            //         taxName: 'Umsatzsteuer',
            //         taxAmount: 2.25,
            //         taxRate: 7,
            //         netAmount: 13.6,
            //         taxId: 'DE143454284',
            //         senderName: 'Office Material AG',
            //         documentDate: '2019-11-15',
            //         senderAddress: 'Postfach 1358 69185 Walldorf',
            //         receiverName: 'ABC Communications',
            //         purchaseOrderNumber: '2838819',
            //         deliveryNoteNumber: '83004411',
            //         receiverAddress: 'Hauptstr. 7 69190 Walldorf, DE',
            //         deliveryDate: '2019-10-29',
            //         shippingAmount: 18.5,
            //         receiverCity: 'Walldorf,',
            //         receiverCountryCode: 'DE',
            //         receiverHouseNumber: '7',
            //         receiverStreet: 'Hauptstr.',
            //         receiverPostalCode: '69190'
            //     },
            //     items: [
            //         {
            //             description: 'AC230 D 16 Color [INST]',
            //             materialNumber: '50150879',
            //             quantity: 1,
            //             unitOfMeasure: 'H87',
            //             unitPrice: 13.6
            //         },
            //         {
            //             description: 'AC230 D ',
            //             materialNumber: '50199879',
            //             quantity: 10,
            //             unitOfMeasure: '887',
            //             unitPrice: 33.6
            //         }
            //     ]
            // }
            // return;
            var oContext = oListBinding.create(invoice.header);
            oContext.created().then(function () {
                // Now the context is created and persisted, safe to access its properties
                var sPath = oContext.getPath();
                invoice.items.forEach(item => {
                         const sHeaderKey = oContext.getProperty("ID"); // Replace with your actual key property
                let oItemBinding = oContext.getModel().bindList(sPath + "/to_items"); // Replace with your navigation path
                              oItemBinding.create(item);
                              });
            }).catch(function (oError) {
                // Handle error during creation
                console.error("Deep create failed:", oError);
            });


        },

        onUploadPress: function (oEvent) {

            const oModel = {};
            this.getView().setModel(new JSONModel(oModel), "invoice");
            const oModel2 = {
                editable: false,
                refreshEnabled: false,
                uploadEnabled: false
            };
            this.getView().setModel(new JSONModel(oModel2), "viewModel");
            const oFileUploader = this.byId("fileUploader1");
            //Upload image
            var reader = new FileReader();
            reader.onload = function (oEvent) {
                // get an access to the content of the file
                this.content = oEvent.currentTarget.result;
                var oFileUploader1 = this.byId("fileUploader1");
                const oModel = this.getView().getModel(); // Assuming your OData V4 model is default
                // Create a binding context for the action
                const oAction = oModel.bindContext("/uploadFile(...)");
                var base64String = this.content;
                const [type, data] = base64String.split(';');
                const contentType = type.split(':')[1];
                const base64Data = data.split(',')[1];
                oAction.setParameter("file", base64Data);
                oAction.setParameter("fileName", oFileUploader1.oFileUpload.files[0].name);

                oAction.execute().then((oResponse, data) => {

                    var oActionContext = oAction.getBoundContext();
                    console.log(oActionContext.getObject()); // Access the action's return value
                    this.getView().getModel("invoice").setData(oActionContext.getObject().invoice);
                    MessageToast.show("File upload action triggered successfully!");
                }).catch((oError) => {
                    MessageToast.show("Error triggering file upload action: " + oError.message);
                });


                //  this.createfile(this.content);
            }.bind(this);
            reader.readAsDataURL(this.file);

        },

        onFileChange: function (oEvent) {
            // Optional: Handle file selection changes
            const oFile = oEvent.getParameter("files")[0];
            if (oFile) {
                MessageToast.show("File selected: " + oFile.name);
            }
        },

        onUploadComplete: function (oEvent) {
            // Optional: Handle the upload complete event from FileUploader
            const sResponse = oEvent.getParameter("response");
            MessageToast.show("FileUploader upload complete: " + sResponse);
        },

        //end of changes

        _getBaseURL: function () {
            var oBaseUrl = this.getOwnerComponent().getManifestEntry("/sap.app/id").replaceAll(".", "/");
            return jQuery.sap.getModulePath(oBaseUrl)
        },

        /**
         * on File Change
         */
        onFileChange: function (oEvent) {
            var file = oEvent.getParameters("files").files[0];
            this.file = file;
        },

        /**
         * On File Upload
         */
        onUploadFile: function () {
            var oUploadSet = this.byId("__fileUploader");
            //Upload image
            var reader = new FileReader();
            reader.onload = function (oEvent) {
                // get an access to the content of the file
                this.content = oEvent.currentTarget.result;
                this.createfile(this.content);
            }.bind(this);
            reader.readAsDataURL(this.file);

        },

        /**
        *  Create Operation to create an entry in CAP
        */
        createfile: function (content) {
           
            var oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/media/"
            });
            var sURL = "/MediaFile";
            let oModel1 = this.getView().getModel();
            let oBindList = oModel1.bindList(sURL);

            var base64String1 = content;
            // If the string includes a data URL prefix (e.g., "data:application/pdf;base64,..."), you may need to split it
            var base64WithoutPrefix1 = base64String1.split(',')[1] || base64String1;

            oBindList.create({
                "content": base64WithoutPrefix1,
                "mediaType": this.file.type,
                "fileName": this.file.name
            }, {
                success: function (oResponse) {
                    sap.m.MessageToast.show("Entity created successfully!");
                },
                error: function (oError) {
                    // This function is executed when the create operation fails.
                    // oError: An object containing error details.
                    sap.m.MessageBox.error("Error creating entity: " + oError.message);
                    //  console.error("Error details:", oError);
                }
            });

        },

        //stat of new methid

        onUpload: function () {
            var that = this;

            var oFileUpload = this.getView().byId("__fileUploader");
            var oUploadedFile = oFileUpload.oFileUpload.files[0];
            const blob = new Blob([oUploadedFile], { type: oUploadedFile.type });

            var oOptions = {
                extraction: {
                    headerFields: ["purchaseOrderNumber", "netAmount", "senderAddress", "currencyCode"],
                    lineItemFields: [
                        "description",
                        "netAmount",
                        "quantity",
                        "unitPrice",
                        "materialNumber",
                        "unitOfMeasure"
                    ]
                },
                clientId: "default"
            };

            var oFormData = new FormData();
            oFormData.append("options", JSON.stringify(oOptions));
            oFormData.append("file", blob, oUploadedFile.name);

            var oScanModel = new JSONModel();
            oScanModel.loadData("oauth/token", "grant_type=client_credentials", {
                "Content-Type": "application/json"
            });
            oScanModel.attachRequestCompleted(
                function (oData) {
                    var sAccessToken = oData.getSource().getProperty("/access_token");

                    var oHeaders = {
                        Accept: "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: "Bearer " + sAccessToken
                    };

                    const requestOptions = {
                        method: "POST",
                        headers: oHeaders,
                        body: oFormData
                    };

                    fetch("doc-info-extraction/v1/document/jobs", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            var oResult = JSON.parse(result);
                            var sJobId = oResult.id;

                            fetch("doc-info-extraction/v1/document/jobs/" + sJobId, {
                                headers: {
                                    Authorization: "Bearer " + sAccessToken
                                }
                            })
                                .then((response) => response.json())
                                .then((result) => {
                                    var oNewClaimModel = new JSONModel({
                                        PONumber: result.extraction.headerFields.find(
                                            (x) => x.name === "purchaseOrderNumber"
                                        ).value,
                                        Vendor: result.extraction.headerFields.find(
                                            (x) => x.name === "senderAddress"
                                        ).value,
                                        Amount: result.extraction.headerFields.find(
                                            (x) => x.name === "netAmount"
                                        ).rawValue,
                                        Receipt: result.fileName
                                    });
                                    that.getView().setModel(oNewClaimModel);
                                })
                                .catch((error) => console.error(error));
                        })
                        .catch((error) => console.error(error));
                }.bind(this)
            );
        },


        

        onSamplecodes: function () {


            //start of methods

        // In your Fiori Elements controller
        // onUploadPress: function () {
        //     const oFileUploader = this.byId("fileUploader1");
        //     oFileUploader.upload(); // Triggers the upload
        // },

        // onUploadComplete: function (oEvent) {
        //     const sResponse = oEvent.getParameter("response");
        //     // Handle the response from the CAPM action
        //     console.log("Upload complete. Response:", sResponse);
        //     sap.m.MessageToast.show("File upload status: " + sResponse);
        //     // You might need to refresh the Fiori app data if the upload affects it
        // }


        //    this.getOwnerComponent().getModel("").create(sURL, oImageData, {
            //         success: function (oData, oResponse) {
            //             var id = oData.id;
            //             var sMsg = "File Uploaded Successfully for ID: " + id;
            //             MessageBox.success(sMsg);
            //         },
            //         error: function (jqXHR, textStatus) {

            //         },
            //     });

                        //Create call for CAP OData Service
            // var oCAPModel = this.getModel("oCAPModel");

            //let oModel1 = this.getView().getModel();
            //              var oEntry = {
            //                 "content": base64WithoutPrefix1,
            //                 "mediaType": this.file.type,
            //                 "fileName": this.file.name
            //               };
            //                 let oBindList1 = oModel.bindList(sURL);

            //             oBindList1.create( oEntry, {
            //     success: function(oCreatedEntry, oResponse) {
            //         // This function is executed when the create operation is successful.
            //         // oCreatedEntry: The newly created entity data returned by the OData service.
            //         // oResponse: The full XHR response object.

            //         sap.m.MessageToast.show("Entity created successfully!");
            //         console.log("Created Entry:", oCreatedEntry);
            //         console.log("Full Response:", oResponse);

            //         // You can access specific properties from the created entry
            //        // var newId = oCreatedEntry.ID; // Assuming 'ID' is a property of the created entity
            //         // ... further processing with the returned data
            //     },
            //     error: function(oError) {
            //         // This function is executed when the create operation fails.
            //         // oError: An object containing error details.

            //         sap.m.MessageBox.error("Error creating entity: " + oError.message);
            //         console.error("Error details:", oError);
            //     }
            // });


                                   
                
               // oItemBinding.create(invoice.items[1]);
                // Further operations with the created context
                        //  const sHeaderKey = oContext.getProperty("ID"); // Replace with your actual key property
            //  let oItemBinding = oContext.getModel().bindList(sPath + "/to_items");
            //  oItemBinding.create(invoice.items);

                // // 2. Create/Update Navigation Items
                // // Example for creating a new item
                // let oItemBinding = oContext.getModel().bindList(sPath + "/to_items"); // Replace with your navigation path


            // // Decode the Base64 string
                // const binaryString = atob(base64Data);
                // const len = binaryString.length;
                // const bytes = new Uint8Array(len);
                // for (let i = 0; i < len; i++) {
                //     bytes[i] = binaryString.charCodeAt(i);
                // }

                // // Create a Blob object
                // const blob = new Blob([bytes], { type: contentType });
                // base64Content = e.target.result.split(',')[1]; // Extract Base64 part
                // base64Content = base64Content.split(',')[1] || base64Content;
                                    //console.log("Created Entry:", oCreatedEntry);
                    // console.log("Full Response:", oResponse);
                    // You can access specific properties from the created entry
                    //  var newId = oCreatedEntry.ID; // Assuming 'ID' is a property of the created entity
                    // ... further processing with the returned data
                                       // This function is executed when the create operation is successful.
                    // oCreatedEntry: The newly created entity data returned by the OData service.
                    // oResponse: The full XHR response object.
                               //************************************************************** */

            // Function to convert Base64 string to Blob
            // function base64ToBlob(base64String, contentType = "",
            //     sliceSize = 512) {
            //     const byteCharacters = atob(base64.split(",")[1]);
            //     const byteArrays = [];

            //     for (let offset = 0; offset < byteCharacters.length;
            //         offset += sliceSize) {
            //         const slice = byteCharacters.slice(
            //             offset, offset + sliceSize);

            //         const byteNumbers = new Array(slice.length);
            //         for (let i = 0; i < slice.length; i++) {
            //             byteNumbers[i] = slice.charCodeAt(i);
            //         }

            //         const byteArray = new Uint8Array(byteNumbers);
            //         byteArrays.push(byteArray);
            //     }

            //     const blob = new Blob(byteArrays, { type: contentType });
            //     return blob;
            // }

            // const blob1 = base64ToBlob(base64String, 'pdf');

    //  this.setModel(oModel, "oCAPModel");




            //              let b64 = Buffer.isBuffer(content) ? null : String(content);
            // if (b64 && b64.startsWith("data:")) {
            //   const i = b64.indexOf("base64,");
            //   if (i > -1) b64 = b64.slice(i + "base64,".length);


            var that = this;


            // Source - https://stackoverflow.com/a
            // Posted by Endless, modified by community. See post 'Timeline' for change history
            // Retrieved 2025-12-07, License - CC BY-SA 3.0

            var base64 = base64WithoutPrefix;


            //   base64 =   base64.base64toBlob;


            function base64ToBlob(base64String, contentType = '', sliceSize = 512) {
                const byteCharacters = atob(base64String.split(',')[1]);
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    const slice = byteCharacters.slice(offset, offset + sliceSize);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }

                const blob = new Blob(byteArrays, { type: contentType });
                return blob;
            }

            // Convert the Base64 string to a Blob
            const blob = base64ToBlob(base64String, 'pdf');
            //  const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

 // Assume 'base64String' is the raw Base64 data received from the backend (e.g., in an OData model)
            // var base64String = "JVBERi0xLjIgCjkgMCBvYmoKPDwgL... (rest of the base64 string)";
            var base64String = content;
            // If the string includes a data URL prefix (e.g., "data:application/pdf;base64,..."), you may need to split it
            var base64WithoutPrefix = base64String.split(',')[1] || base64String;

            // Function to convert Base64 string to a Blob object
            function base64toBlob(base64Data, contentType) {
                contentType = contentType || 'application/pdf';
                var sliceSize = 1024;
                var byteCharacters = atob(base64Data);
                var bytesLength = byteCharacters.length;
                var slicesCount = Math.ceil(bytesLength / sliceSize);
                var byteArrays = new Array(slicesCount);

                for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                    var begin = sliceIndex * sliceSize;
                    var end = Math.min(begin + sliceSize, bytesLength);

                    var bytes = new Array(end - begin);
                    for (var i = begin; i < end; ++i) {
                        bytes[i] = byteCharacters[i].charCodeAt(0);
                    }
                    byteArrays[sliceIndex] = new Uint8Array(bytes);
                }
                return new Blob(byteArrays, { type: contentType });
            }

            // var pdfBlob = base64toBlob(base64WithoutPrefix, 'application/pdf');


            // var base64EncodedPdf = "JVBERi0xLjUNCi...."; // Your Base64 encoded PDF string
            // var decodedPdfString = window.atob(base64WithoutPrefix);
            //   var decdata = Buffer.from(base64WithoutPrefix, 'base64');



            // To display the PDF in an iframe or new window:
            // var blobUrl = URL.createObjectURL(pdfBlob);
            // window.open(blobUrl, '_blank');

            // // To trigger a download (e.g., when a button is pressed):
            // var link = document.createElement('a');
            // link.href = blobUrl;
            // link.download = 'document.pdf'; // Desired file name
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);

            // const binaryString = atob(base64WithoutPrefix);

            var pdfBlob;
            try {
                const binaryString = atob(base64WithoutPrefix);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                //  pdfBlob = new Blob([bytes], { type: 'application/pdf' });
                pdfBlob = new Blob([bytes.buffer], { type: 'application/pdf' });

            } catch (error) {
                //nothing

            }
            //*\\**************************************************************************** */

            // Data for CAP to create entry

            //  var oCAPModel = this.getView().getModel();
            // this.getView().getModel()
            // const aFiles = oFileUploader.getUploadedFile(); // Get the selected file

            // if (aFiles && aFiles.length > 0) {
            //     const oFile = aFiles[0];
            //     const oModel = this.getView().getModel(); // Assuming your OData V4 model is default

            //     // Create a binding context for the action
            //     const oAction = oModel.bindContext("/uploadFile(...)");

            //     // Set the file content as a parameter
            //     // Note: File content needs to be read and converted to a suitable format (e.g., Base64)
            //     // for sending as a parameter in a standard OData V4 action call.
            //     // For direct file upload, FileUploader handles the multipart/form-data.
            //     // However, if you are explicitly passing it as an action parameter,
            //     // you'd typically read the file and convert it to Base64.

            //     const reader = new FileReader();
            //     reader.onload = (e) => {
            //         const base64Content = e.target.result.split(',')[1]; // Extract Base64 part
            //         oAction.setParameter("file", base64Content);

            //         oAction.execute().then(() => {
            //             MessageToast.show("File upload action triggered successfully!");
            //         }).catch((oError) => {
            //             MessageToast.show("Error triggering file upload action: " + oError.message);
            //         });
            //     };
            //     reader.readAsDataURL(oFile); // Read file as Data URL to get Base64
            // } else {
            //     MessageToast.show("Please select a file to upload.");
            // }





        //end of methods






        }


        //end of methods

    });
});