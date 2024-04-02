function validatePAN(pan : string) {
    var pattern = /^[A-Z]{3}[A-Z][A-ZCPHFT][A-Z]\d{4}[A-Z]$/;
    return pattern.test(pan);
}

const authorizeVerification = (docURL: string, PANNumber: string, PANUrl: string, DarpanID: string) => {
    if(PANNumber[3] === 'P'){
        return false;
    }

    if(validatePAN(PANNumber)){
        return true;
    }

}