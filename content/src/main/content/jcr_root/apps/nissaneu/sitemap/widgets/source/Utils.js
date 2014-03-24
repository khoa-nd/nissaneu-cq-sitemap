/**
 * This is used to open a dialog
 * url: location of dialog, e.g.,  /apps/nissaneu/components/micraelle/navLink/dialog.infinity.json
 * path: path of node
 */
function doOpenDlg(url, path) {
    var d = CQ.WCM.getDialog(url);
    var reloadPage = true;
    if(d) {
        if( reloadPage ) {
            d.success = function(form, action) {
                CQ.Util.reload(CQ.WCM.getContentWindow());
            };
        }
        //d.modal = true;
        d.show();
        //d.loadContent(editComponent.path);
        d.loadContent(path);
    }
}
/**
 * This is used to set property allowBlank of list fldNames(separated by "#") if all list chkFldNames(separated by "#") is checked
 */
function setAllowBlank(dialog, chkFldNames, fldNames) {
    if (dialog && typeof(chkFldNames) != 'undefined' && typeof(fldNames) != 'undefined') {
    	var objs = chkFldNames.split('#');
        var flds = fldNames.split('#');
        var isAllowBlank = true;
        var n = 0;
        
        //check condition: all members of list chkFldNames must be checked
        for(var j = 0; j < objs.length; j++) {
    		if (dialog.getField(objs[j])) {
    			var obj = dialog.getField(objs[j]);
    			var val = '' + obj.getValue();
    			if (obj.checked || (val != '' && val == 'true')) {
    				n++;
    	        } else {
    	        	j = objs.length;
    	        }
    		}
    	}
        if (n == objs.length) {
        	isAllowBlank = false;
        }

        //set allowBlank=false to list fldNames
    	for(var i = 0; i < flds.length; i++) {
    		if (dialog.getField(flds[i])) {
    			dialog.getField(flds[i]).allowBlank = isAllowBlank;
    		}
    	}
    }
}
/**
 * This is used to validate textfield for number, you must only type number
 */
function validateNumber(dialog, chkFldName, titleComponent) {
	var val = dialog.getField(chkFldName).getValue();
	if (isNaN(val)) {
		alert(titleComponent + " must be the number.");
		return false;
	} else {
		return true;
	}
	
}

/**
 * This script use for USPGridComp component only
 */
function beforeSubmitDlg(dialog){
	var backgroundSWF = dialog.getField('./backgroundSWF').getValue();
	var listImage = dialog.findByType('html5smartimage');
	
	if(backgroundSWF =="" && listImage[0].fileInfo ==null && listImage[0].originalRefImage ==null) {
		CQ.Ext.Msg.alert('Validation Failed', 'Verify the values of the background SWF fields.');
		return false;
	}
	
	return true;
}

/**
 * For back button in Car Builder V5
 */
function historyBack(){
    document.location="/";
}