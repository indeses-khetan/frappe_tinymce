// ✅ Save original implementation FIRST
const OriginalControlTextEditor = frappe.ui.form.ControlTextEditor;

frappe.ui.form.ControlTextEditor = class ControlTextEditor extends OriginalControlTextEditor {

    make_input() {
        this.has_input = true;

        const allowed_doctypes = ["Matter", "EL Letter Template"];

        // 1️⃣ System UI (Customize Form, Email Template builder internals)
        if (!this.frm || !this.frm.doctype) {
            return super.make_input(); // original Quill
        }

        // 2️⃣ Other doctypes → ORIGINAL QUILL
        if (!allowed_doctypes.includes(this.frm.doctype)) {
            return super.make_input(); // original Quill
        }

        // 3️⃣ Allowed doctypes → TinyMCE
        this.make_tinymce_editor();
    }

    make_tinymce_editor() {
        const that = this;

        this.quill_container = $('<div>').appendTo(this.input_area);

        tinymce.init({
            target: this.input_area,
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
                that.activeEditor = editor;

                editor.on('init', function () {
                    editor.setContent(that.value || "");
                });

                editor.on('Change KeyUp Undo Redo', function () {
                    that.parse_validate_and_set_in_model(editor.getContent());
                });
            }
        });
    }

    set_formatted_input(value) {
        if (this.activeEditor) {
            this.activeEditor.setContent(value || "");
        } else {
            super.set_formatted_input(value);
        }
    }
};
 