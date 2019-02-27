import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
    // 导出Excel表格
    exportExcel (name) {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#lafite_datas'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name)
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
    }
}