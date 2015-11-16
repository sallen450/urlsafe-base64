(function () {
'use strict';

function encodeSafeUrl(str) {
    return str.replace(/[+=/]/g, function(replacement) {
        return {"+": ".","=": "-","/": "_",}[replacement];
    });
}

function decodeSafeUrl(str) {
    return str.replace(/[.-_]/g, function(replacement) {
        return {".": "+","-": "=","_": "/",}[replacement];
    });
}

function utf8ToBinaryString(str) {
    var escstr = encodeURIComponent(str);
    // replaces any uri escape sequence, such as %0A,
    // with binary escape, such as 0x0A
    var binstr = escstr.replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    });

    return binstr;
}

function utf8ToBase64(str) {
    var binstr = utf8ToBinaryString(str);
    return encodeSafeUrl(btoa(binstr));
}

function binaryStringToUtf8(binstr) {
    var escstr = binstr.replace(/(.)/g, function (m, p) {
        var code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = '0' + code;
        }
        return '%' + code;
    });

    return decodeURIComponent(escstr);
}

function base64ToUtf8(b64) {
    var binstr = decodeSafeUrl(atob(b64));

    return binaryStringToUtf8(binstr);
}

window.Unibabel = {
    encodeSafeUrl: utf8ToBase64,
    decodeSafeUrl: base64ToUtf8,
};

}());
