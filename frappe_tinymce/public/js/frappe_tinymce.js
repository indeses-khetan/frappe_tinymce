// ✅ Preserve original Quill editor
const OriginalControlTextEditor = frappe.ui.form.ControlTextEditor;

frappe.ui.form.ControlTextEditor = class ControlTextEditor extends OriginalControlTextEditor {

    make_input() {
        this.has_input = true;

        const allowed_doctypes = ["Matter", "EL Letter Template"];

        // System UI + other doctypes → Quill
        if (!this.frm || !allowed_doctypes.includes(this.frm.doctype)) {
            return super.make_input();
        }

        // Allowed doctypes → TinyMCE
        this.make_tinymce_editor();
    }

    make_tinymce_editor() {
        const that = this;

        // 🔒 SAFELY convert to jQuery
        const $input_area = $(this.input_area);

        // Clear only the input area
        $input_area.empty();

        // Create dedicated container
        this.$editor_container = $('<div class="tinymce-editor"></div>')
            .appendTo($input_area);

        tinymce.init({
            target: this.$editor_container[0],
            height: 450,

            toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags',
            font_size_formats: '10px 11px 12px 14px 15px 16px 18px 24px 36px',
            plugins: [
              'autoresize', 'autolink', 'charmap', 'emoticons', 'fullscreen', 'help',
              'image', 'link', 'lists', 'searchreplace',
              'table', 'visualblocks', 'visualchars', 'wordcount', 'media', 'anchor'
            ],
            powerpaste_googledocs_import: "prompt",
            entity_encoding: 'raw',
            convert_urls: true,
            content_css: false,
            toolbar_sticky: true,
            promotion: false,
            default_link_target: "_blank",

            setup(editor) {
                that.editor = editor;

                editor.on('init', () => {
                    editor.setContent(that.value || "");
                });

                editor.on('change keyup', () => {
                    const value = editor.getContent();

                    that.value = value;

                    if (that.frm && that.df && that.df.fieldname) {
                        that.frm.doc[that.df.fieldname] = value;
                        that.frm.dirty(); // ✅ THIS IS THE KEY
                    }
                });
            }

        });
    }

    set_formatted_input(value) {
        if (this.editor && value !== this.editor.getContent()) {
            this.editor.setContent(value || "");
        } else {
            super.set_formatted_input(value);
        }
    }

    get_value() {
        if (this.editor) {
            return this.editor.getContent();
        }
        return super.get_value();
    }
};
