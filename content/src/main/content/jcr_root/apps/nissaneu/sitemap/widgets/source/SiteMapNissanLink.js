/*!
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license

/**
 * @class CQ.Ext.form.SiteMapNissanLink
 * @extends CQ.Ext.form.TriggerField
 * Provides a field with allows to build a link with several information such as link,label,type ...
 * @constructor
 * Create a new SiteMapNissanLink
 * @param {Object} config
 * @xtype sitemapnissanlink
 */
CQ.Ext.form.SiteMapNissanLink = CQ.Ext.extend(CQ.Ext.form.TriggerField,  {
   
    linkDialog : null,
    maxLengthLabel: null,
    
     "triggerClass" : "x-form-search-trigger",
     
     "separator" : "#!",

     "readOnly" : false,
     
     updateEditState: function(){
        if(this.rendered){
            if (this.readOnly) {
                this.el.dom.readOnly = true;
                //this.el.addClass('x-trigger-noedit');
                //this.mun(this.el, 'click', this.onTriggerClick, this);
                //this.trigger.setDisplayed(false);
            } else {
                if (!this.editable) {
                    this.el.dom.readOnly = true;
                    this.el.addClass('x-trigger-noedit');
                    this.mon(this.el, 'click', this.onTriggerClick, this);
                } else {
                    this.el.dom.readOnly = false;
                    this.el.removeClass('x-trigger-noedit');
                    this.mun(this.el, 'click', this.onTriggerClick, this);
                }
                this.trigger.setDisplayed(!this.hideTrigger);
            }
            this.onResize(this.width || this.wrap.getWidth());
        }
    },
    constructor: function(config) {
        
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.SiteMapNissanLink.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.SiteMapNissanLink.superclass.initComponent.call(this);
    },
     
    // private
    onDestroy : function(){
        //CQ.Ext.destroy(this.menu, this.keyNav);
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.SiteMapNissanLink.superclass.onDestroy.call(this);
    },

    /**
     * @method onTriggerClick
     * @hide
     */
    // private
    // Implements the default empty TriggerField.onTriggerClick function to display the DatePicker
        
    onTriggerClick : function(){
       
        var parentDialog = this.findParentByType("dialog");
        fieldName = this.getName();

        var typeName = fieldName+"_type";
        var linkName = fieldName+"_link";
        var labelName = fieldName+"_label";
        var onclickName= fieldName+"_onclick";
        var targetName = fieldName+"_target";
        var omnitureName = fieldName + "_omniture";
        var iconName = fieldName + "_icon";
        var hiddenMobileName = fieldName + "_hiddenMobile";
        var hiddenTabletName = fieldName + "_hiddenTablet";
        var hiddenSEOName = fieldName + "_hiddenSEO";
        var outsideTaggingName = fieldName + "_outsideTagging";
        var popinId = 'popinId';
        var hiddenPopup = false;

        var typeValue;
        var linkValue;
        var labelValue;
        var onclickValue;
        var targetValue;
        var omnitureValue;
        var iconValue;
        var hiddenMobileValue;
        var hiddenTabletValue;
        var hiddenSEOValue;
        var outsideTaggingValue;
        var popinValue;
        var maxLengthLabel = this.maxLengthLabel;
        var fieldValues = this.getValue();
        var elem = fieldValues.split(this.separator);
        
        typeValue =elem[0];
        linkValue = elem[1];
        labelValue = elem[2];
        targetValue = elem[3];
        omnitureValue = elem[4];
        iconValue = elem[5];
        popinValue = elem[6];
        hiddenTabletValue = elem[8];
        onclickValue = elem[7];
        hiddenMobileValue = elem[9];
        hiddenSEOValue = elem[10];
        outsideTaggingValue = elem[11];

        /*
        typeField = parentDialog.getField(linkName);
        linkField = parentDialog.getField(linkName);
        labelField = parentDialog.getField(labelName);
        targetField = parentDialog.getField(targetName);
        omnitureField = parentDialog.getField(omnitureName);
        
                
        if (linkField) {
            typeValue = typeField.getValue();
            linkValue = linkField.getValue();
            labelValue= labelField.getValue();
            targetValue = targetField.getValue();
            omnitureValue = omnitureField.getValue();
        } 
        
        */
                
        // lazy creation of browse dialog
        if (this.linkDialog == null) {
            function okHandler() {
                prefix = this.linkfield.getName();
               
                var typeName = prefix+"_type";
                var linkName = prefix+"_link";
                var labelName = prefix+"_label";
                var onclickName= fieldName+"_onclick";
                var targetName = prefix+"_target";
                var omnitureName = prefix + "_omniture";
                var iconName = prefix + "_icon";
                var hiddenMobileName = prefix + "_hiddenMobile";
                var hiddenTabletName = prefix + "_hiddenTablet";
                var hiddenSEOName = prefix + "_hiddenSEO";
                var outsideTaggingName = prefix + "_outsideTagging";
                var popinId = 'popinId';
                
                onclickValue = this.getField(onclickName).getValue();
                typeValue = this.getField(typeName).getValue().inputValue;
                linkValue = this.getField(linkName).getValue();
                labelValue = this.getField(labelName).getValue();
                targetValue = this.getField(targetName).getValue();
                omnitureValue = this.getField(omnitureName).getValue();
                iconValue = this.getField(iconName).getValue();
                popinValue = this.getField(popinId).getValue();
                hiddenMobileValue = this.getField(hiddenMobileName).getValue();
                hiddenTabletValue = this.getField(hiddenTabletName).getValue();
                hiddenSEOValue = this.getField(hiddenSEOName).getValue();
                outsideTaggingValue = this.getField(outsideTaggingName).getValue();
                
                this.linkfield.setValue(typeValue+this.linkfield.separator+linkValue+this.linkfield.separator+labelValue+this.linkfield.separator+targetValue+this.linkfield.separator+omnitureValue+this.linkfield.separator+iconValue+this.linkfield.separator+popinValue+this.linkfield.separator+onclickValue+this.linkfield.separator+hiddenTabletValue);
                
                // Validate Max length of label
                if (maxLengthLabel != null && maxLengthLabel > 0 &&  labelValue.length > maxLengthLabel) {
                    this.getField(labelName).markInvalid( "The maximum length for this field is " + maxLengthLabel);
                    return false;
                }
                else  {
                    this.getField(labelName).clearInvalid();
                    this.linkfield.fireEvent("change");
                    this.hide();
                }
                
            }
            
            if(typeValue != 'popup') {
            	hiddenPopup = true;
            }
            var linkDialogCfg = {
            
                    "ok" : okHandler,                    
                    "id": CQ.Util.createId("cq-linkdialog"),
                    "title":this.fieldLabel + " detail",                   
                    "height": 439,
                    "width" : 472,
                    "xtype" : "dialog",
                    "linkfield" : this,
                    
                    "items": {
                        "xtype": "panel",                        
                        "items": [{
                            "xtype": "radiogroup",
                            "fieldLabel":"Link type :",                            
                            "name":typeName,
                            "value":typeValue,
                            "items": [
                                    {boxLabel: 'Internal', name: 'type',inputValue:"int",checked: true},
                                    {boxLabel: 'External', name: 'type',inputValue:"ext"},
                                    {boxLabel: 'PopIn', name: 'type',inputValue:"popin"},
                                    {boxLabel: 'PopUp', name: 'type',inputValue:"popup"}],                                    
                                    "listeners": {
                                       "change": function(cb, nv, ov) {
                                    	   var dialogParent = nv.findParentByType("dialog");                                    	   
                                           if (nv.inputValue == 'popup') {
                                        	   
                                        	   dialogParent.getField(labelName).hide();
                                        	   dialogParent.getField(linkName).hide();
                                        	   dialogParent.getField(targetName).hide();
                                        	   dialogParent.getField(popinId).hide();
                                        	   dialogParent.getField(omnitureName).hide();
                                        	   dialogParent.getField(iconName).hide();

                                        	   dialogParent.getField(onclickName).show();
                                           } else {
                                        	   dialogParent.getField(onclickName).hide();
                                               
                                        	   dialogParent.getField(linkName).show();
                                        	   dialogParent.getField(labelName).show();
                                        	   dialogParent.getField(targetName).show();
                                        	   dialogParent.getField(popinId).show();
                                        	   dialogParent.getField(omnitureName).show();
                                        	   dialogParent.getField(iconName).show();
                                           }
                                       }
                                   }                                       
  
                       }, {
                            "xtype": "pathfield",
                            "fieldLabel":"Link :",                                                     
                            "name":linkName,
                            "hidden" : !hiddenPopup,
                            "value":linkValue,
                            "rootPath":"/",
                            "listeners": {
                                "blur": function() {
                                    while (/(.*)\/$/.test(this.getValue())) {
                                        this.setValue(this.getValue().replace(/(.*)\/$/, "$1"));
                                    };
                                    
                                    var panel = this.findParentByType("panel");
                                    var popinId = (panel.items.get('popinId'));
                                    CQ.Ext.Ajax.request({          
                                        url: '/apps/nissaneu/newproductsite/components/popInEditorialComp/data.popins.json?pageUrl='+this.getValue(),
                                        success: function(r) { 
                                            try{
                                                var arr = [];
                                                var opts = r.responseText.split(";");
                                                if (opts != null && opts.length>0) {
                                                    var i;
                                                    for(i=0; i < opts.length;i++){
                                                        arr.push({value:opts[i]});
                                                    }
                                                    popinId.setOptions(arr);
                                                }
                                            } catch(err){
                                                alert(err);
                                            }
                                        }
                                    });                                 
                                },
                                "dialogselect": function() {
                                    while (/(.*)\/$/.test(this.getValue())) {
                                        this.setValue(this.getValue().replace(/(.*)\/$/, "$1"));
                                    };
                                    
                                    var panel = this.findParentByType("panel");
                                    var popinId = (panel.items.get('popinId'));
                                    CQ.Ext.Ajax.request({          
                                        url: '/apps/nissaneu/newproductsite/components/popInEditorialComp/data.popins.json?pageUrl='+this.getValue(),
                                        success: function(r) { 
                                            try{
                                                var arr = [];
                                                var opts = r.responseText.split(";");
                                                if (opts != null && opts.length>0) {
                                                    var i;
                                                    for(i=0; i < opts.length;i++){
                                                        arr.push({value:opts[i]});
                                                    }
                                                    popinId.setOptions(arr);
                                                }
                                            } catch(err){
                                                alert(err);
                                            }
                                        }
                                    });                                 
                                }
                            }
                        }, {
                            "fieldLabel":"Link Label :",
                            "xtype": "textfield",                                                   
                            "name":labelName,
                            "hidden" : !hiddenPopup,
                            "value":labelValue
                        },  {
                            "fieldLabel" : "Link Popin :", 
                            "name" : popinId,                           
                            "itemId": "popinId",
                            "hidden" : !hiddenPopup,
                            "value" : popinValue,
                            "defaultValue" : popinValue,
                            "type" : "select",
                            "xtype" : "selection"
                            
                        },  {
                            "fieldLabel":"Link target :",                            
                            "xtype": "textfield",
                            "name":targetName,
                            "hidden" : !hiddenPopup,
                            "value":targetValue
                        },
                        {
                            "fieldLabel":"Link omniture :",                            
                            "type" : 'select',
                            "xtype": "selection",
                            "name":omnitureName,
                            "hidden" : !hiddenPopup,
                           "value":omnitureValue,
                            "optionsRoot":"optionsRoot",
                            "optionsTextField":"text",
                            "optionsValueField":"value",
                            "options":'/apps/nissaneu/common/components/sitemapNissanLink/data.omniture.json'
                        },
                        {
                            "xtype": "pathfield",
                            "fieldLabel":"Link Icon :",                                                       
                            "name":iconName,
                            "hidden" : !hiddenPopup,
                            "value":iconValue,
                            "listeners": {
                                "blur": function() {
                                    while (/(.*)\/$/.test(this.getValue())) {
                                        this.setValue(this.getValue().replace(/(.*)\/$/, "$1"));
                                    }
                                }
                            }                            
                        },
                        {
                            "xtype": "selection",
                            "type" : "checkbox",
                            "fieldLabel":"Hidden Mobile :",                                                       
                            "name": hiddenMobileName,
                            "hidden" : !hiddenPopup,
                            "value": hiddenTabletValue          
                        },
                        {
                            "xtype": "selection",
                            "type" : "checkbox",
                            "fieldLabel":"Hidden Tablet :",                                                       
                            "name": hiddenTabletName,
                            "hidden" : !hiddenPopup,
                            "value": hiddenTabletValue          
                        },
                        {
                            "xtype": "selection",
                            "type" : "checkbox",
                            "fieldLabel":"Hidden SEO :",                                                       
                            "name": hiddenSEOName,
                            "hidden" : !hiddenPopup,
                            "value": hiddenTabletValue          
                        },
                        {
                            "xtype": "selection",
                            "type" : "checkbox",
                            "fieldLabel":"Outside Tagging :",                                                       
                            "name": outsideTaggingName,
                            "hidden" : !hiddenPopup,
                            "value": hiddenTabletValue          
                        },
                        {
                            "fieldLabel":"Onclick Value :",                            
                            "xtype": "textfield",
                            "name":onclickName,
                            "hidden" : hiddenPopup,
                            "value":onclickValue
                        }]
                    }
                };                   
            
            linkDialogCfg.buttons = CQ.Dialog.OKCANCEL;             
            this.linkDialog = new CQ.Dialog(linkDialogCfg); 

        } else {
            //TODO put value       
        }
                               
        this.linkDialog.show();                             
    }
    
});
CQ.Ext.reg('sitemapnissanlink', CQ.Ext.form.SiteMapNissanLink);