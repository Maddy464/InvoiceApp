
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("invoiceui.controller.Upload", {
        onInit() {
        },

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

            //  const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
















            var oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/media/"

            });
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

            //*\\**************************************************************************** */

            // Data for CAP to create entry
       
            //  var oCAPModel = this.getView().getModel();
            // this.getView().getModel()
            var sURL = "/MediaFile";
            //Create call for CAP OData Service
            // var oCAPModel = this.getModel("oCAPModel");


            let oModel1 = this.getView().getModel();
            let oBindList = oModel1.bindList(sURL);

            var base64String1 = content;
            // If the string includes a data URL prefix (e.g., "data:application/pdf;base64,..."), you may need to split it
            var base64WithoutPrefix1 = base64String1.split(',')[1] || base64String1;

            oBindList.create({
                "content": base64WithoutPrefix1,
                "mediaType": this.file.type,
                "fileName": this.file.name
            });


            //    this.getOwnerComponent().getModel("").create(sURL, oImageData, {
            //         success: function (oData, oResponse) {
            //             var id = oData.id;
            //             var sMsg = "File Uploaded Successfully for ID: " + id;
            //             MessageBox.success(sMsg);
            //         },
            //         error: function (jqXHR, textStatus) {

            //         },
            //     });

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




        //end of methods

    });
});