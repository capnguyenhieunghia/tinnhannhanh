function doGet(e) {
    return handleResponse(e);
}

//  Cái sheet hồi nãy mới viết dùng để thu thập thông tin là gì thì điền tên nó vào đây nhé, mình viết vào Sheet1 
    var SHEET_NAME = 'dat-ldp';
    var SCRIPT_PROP = PropertiesService.getScriptProperties(); // Tạo new property service

function handleResponse(e) {
    var lock = LockService.getPublicLock();
    lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
  
    try {
        // Chọn nơi để lưu data lấy về được (sheet1)
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
        var sheet = doc.getSheetByName(SHEET_NAME);
    
        // Ở đây định nghĩa tên các input nằm hết trên hàng 1 nhé
        var headRow = e.parameter.header_row || 1;
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1; // Nhảy sang hàng tiếp theo
        var row = []; 
        // Lặp lại đến hết các cột trên đầu
        for (i in headers) {
            if (headers[i] == 'Timestamp') { // Nếu bạn có cột Timestamp lưu lại thời gian nhé
                row.push(new Date());
            } else { // Nếu không thì cứ dùng tên hàng đầu để lấy data
                row.push(e.parameter[headers[i]]);
            }
        }

        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

        // return json success results
        return ContentService
            .createTextOutput(JSON.stringify({'result': 'success', 'row': nextRow}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch(e) {
    // Nếu lỗi báo lỗi trả về
        return ContentService
            .createTextOutput(JSON.stringify({'result': 'error', 'error': e}))
            .setMimeType(ContentService.MimeType.JSON);
    } finally { //release lock
        lock.releaseLock();
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty('key', doc.getId());
}