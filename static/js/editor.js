
var Editor = Editor || {};

Editor.codemirror = null;

Editor.fromTextArea = function(ajax_url, textarea_css_id, preview_css_id) {
    var self = Editor;
    self.ajax_url = ajax_url
    self.textarea_css_id = textarea_css_id
    self.preview_css_id = preview_css_id
    textarea = document.getElementById(textarea_css_id)
    self.codemirror = CodeMirror.fromTextArea(textarea, {
        mode: 'markdown',
        lineNumbers: true,
        theme: 'default',
        extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'}
    });
    self.textarea = jQuery(textarea)
    self.preview = jQuery('#' + self.preview_css_id)
    
    jQuery('a#menu_preview').bind('click', self.init_preview);
    jQuery('a#menu_save').bind('click', self.init_save);
    jQuery('a#menu_cancel').bind('click', self.init_cancel);
    jQuery('a#menu_help').bind('click', self.help_markdown);
    return self;
}


Editor.help_markdown = function() {
    var dlg = jQuery('#help_markdown').dialog({
        modal:true, show:false, resizable:false, width:'90%' })
}


Editor.init_preview = function() {
    var self = Editor;
    jQuery.post(self.ajax_url, {
        command: 'preview',
    	source: self.codemirror.getDoc().getValue(),
    }, self.preview_callback);
}

Editor.preview_callback = function(data_json) {
    var self = Editor;
    data = JSON.parse(data_json)
    if (!data.ok) {
        alert('Error creating preview.')
        return;
    }
    self.preview.html(data.html);
}



Editor.init_save = function() {
    var self = Editor;
    jQuery.post(self.ajax_url, {
        command: 'save',
    	source: self.codemirror.getDoc().getValue(),
    }, self.save_callback);
}

Editor.save_callback = function(data_json) {
    var self = Editor;
    data = JSON.parse(data_json);
    if (!data.ok) {
        alert('Error saving data.')
        return;
    }
    window.location.replace(data.redirect);
}



Editor.init_cancel = function() {
    var self = Editor;
    jQuery.post(self.ajax_url, {
        command: 'cancel',
    }, self.cancel_callback);
}

Editor.cancel_callback = function(data_json) {
    data = JSON.parse(data_json);
    if (!data.ok) {
        alert('Error saving data.')
        return;
    }
    window.location.replace(data.redirect);
}
