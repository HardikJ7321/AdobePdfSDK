/*
 * Copyright 2019 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

const DCServicesSdk = require('@adobe/dc-services-node-sdk');

/**
 * This sample illustrates how to export a PDF file to a Word (DOCX) file
 * <p>
 * Refer to README.md for instructions on how to run the samples.
 */

try {
    // Initial setup, create credentials instance.
    const credentials =  DCServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("dc-services-sdk-credentials.json")
        .build();

    //Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = DCServicesSdk.ExecutionContext.create(credentials),
        exportPDF = DCServicesSdk.ExportPDF,
        exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.DOCX);

    // Set operation input from a source file
    const input = DCServicesSdk.FileRef.createFromLocalFile('resources/exportPDFInput.pdf');
    exportPdfOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    exportPdfOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/exportPdfOutput.docx'))
        .catch(err => {
            if(err instanceof DCServicesSdk.Error.ServiceApiError
                || err instanceof DCServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
