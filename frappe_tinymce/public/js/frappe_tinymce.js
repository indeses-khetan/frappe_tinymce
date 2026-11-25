// // ✅ Preserve original Quill editor
// const OriginalControlTextEditor = frappe.ui.form.ControlTextEditor;

// frappe.ui.form.ControlTextEditor = class ControlTextEditor extends OriginalControlTextEditor {

//     make_input() {
//         this.has_input = true;

//         const allowed_doctypes = ["Matter", "EL Letter Template", "Email Template", "Job Application", "Agreement Template", "EL Letter" ];

//         // System UI + other doctypes → Quill
//         if (!this.frm || !allowed_doctypes.includes(this.frm.doctype)) {
//             return super.make_input();
//         }

//         // Allowed doctypes → TinyMCE
//         this.make_tinymce_editor();
//     }

//     make_tinymce_editor() {
//         const that = this;

//         // 🔒 SAFELY convert to jQuery
//         const $input_area = $(this.input_area);

//         // Clear only the input area
//         $input_area.empty();

//         // Create dedicated container
//         this.$editor_container = $('<div class="tinymce-editor"></div>')
//             .appendTo($input_area);

//         tinymce.init({

//             font_family_formats:
//                 'MADEEvolveSans, sans-serif;' +
//                 'Arial=arial,helvetica,sans-serif;' +
//                 'Times New Roman=times new roman,times,serif;' +
//                 'Roboto=Roboto,sans-serif;' +
//                 'Poppins=Poppins,sans-serif;' +
//                 'Noto Sans=Noto Sans,sans-serif;' +
//                 'Noto Serif=Noto Serif,serif;',
//             font_size_formats: '10px 11px 12px 14px 15px 16px 18px 24px 36px',
//             content_style: `
//                     @import url(https://db.onlinewebfonts.com/c/b02a42732540bb1927af84ae271de951?family=MADEEvolveSans);
//                     body {
//                         font-family: "MADEEvolveSans";
//                         font-size: 14px;
//                     }

//                     `,

//             target: this.$editor_container[0],
//             height: 450,

//             toolbar: 'undo redo | code | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags',
//             font_size_formats: '10px 11px 12px 14px 15px 16px 18px 24px 36px',
//             plugins: [
//                 'code', 'autoresize', 'autolink', 'charmap', 'emoticons', 'fullscreen', 'help',
//                 'image', 'link', 'lists', 'searchreplace', 'paste', 
//                 'table', 'visualblocks', 'visualchars', 'wordcount', 'media', 'anchor'
//             ],
//             paste_preprocess: function(plugin, args) {
//                 const div = document.createElement("div");
//                 div.innerHTML = args.content;

//                 div.querySelectorAll("*").forEach(el => {
//                     el.removeAttribute("style");
//                     el.removeAttribute("class");
//                     el.removeAttribute("face");
//                     el.removeAttribute("size");
//                     el.removeAttribute("color");
//                     el.removeAttribute("bgcolor");
//                     el.removeAttribute("align");
//                     el.removeAttribute("valign");
//                 });

//                 div.querySelectorAll("span, font").forEach(el => {
//                     el.replaceWith(...el.childNodes);
//                 });

//                 div.querySelectorAll("p, div").forEach(el => {
//                     const text = el.textContent
//                         .replace(/\u00a0/g, "")
//                         .trim();

//                     if (!text && !el.querySelector("img, table, br")) {
//                         el.remove();
//                     }
//                 });

//                 args.content = div.innerHTML;
//             },
//             powerpaste_googledocs_import: "prompt",
//             entity_encoding: 'raw',
//             convert_urls: true,
//             content_css: false,
//             toolbar_sticky: true,
//             promotion: false,
//             default_link_target: "_blank",

//             setup(editor) {
//                 that.editor = editor;

//                 editor.on('init', () => {
//                     editor.setContent(that.value || "");
//                 });

//                 editor.on('change keyup', () => {
//                     const value = editor.getContent();

//                     that.value = value;

//                     if (that.frm && that.df && that.df.fieldname) {
//                         that.frm.doc[that.df.fieldname] = value;
//                         that.frm.dirty(); // ✅ THIS IS THE KEY
//                     }
//                 });
//             }

//         });
        
//     }

//     set_formatted_input(value) {
//         if (this.editor && value !== this.editor.getContent()) {
//             this.editor.setContent(value || "");
//         } else {
//             super.set_formatted_input(value);
//         }
//     }

//     get_value() {
//         if (this.editor) {
//             return this.editor.getContent();
//         }
//         return super.get_value();
//     }
// };


// ✅ Preserve original Quill editor
const OriginalControlTextEditor = frappe.ui.form.ControlTextEditor;

frappe.ui.form.ControlTextEditor = class ControlTextEditor extends OriginalControlTextEditor {

    make_input() {
        this.has_input = true;

        const allowed_doctypes = [
            "Matter",
            "EL Letter Template",
            "Email Template",
            "Job Application",
            "Agreement Template",
            "EL Letter"
        ];

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

            font_family_formats:
                'MADE Evolve Sans=MADE Evolve Sans,sans-serif;' +
                'Arial=arial,helvetica,sans-serif;' +
                'Times New Roman=times new roman,times,serif;' +
                'Roboto=Roboto,sans-serif;' +
                'Poppins=Poppins,sans-serif;' +
                'Noto Sans=Noto Sans,sans-serif;' +
                'Noto Serif=Noto Serif,serif;',
            font_size_formats: '10px 11px 12px 14px 15px 16px 18px 24px 36px',

            // Default editor style (with fallback fonts, no blocked @import)
            content_style: `
                body {
                    font-family: "MADE Evolve Sans", sans-serif;
                    font-size: 14px;
                }
            `,

            target: this.$editor_container[0],
            height: 450,

            toolbar: 'undo redo | code | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags',

            // NOTE: 'paste' removed (built into TinyMCE 6+). If you are on v5, add 'paste' back.
            plugins: [
                'code', 'autoresize', 'autolink', 'charmap', 'emoticons', 'fullscreen', 'help',
                'image', 'link', 'lists', 'searchreplace',
                'table', 'visualblocks', 'visualchars', 'wordcount', 'media', 'anchor'
            ],

            // ---------- PASTE HANDLING ----------
            paste_webkit_styles: 'none',
            paste_remove_styles_if_webkit: true,
            paste_merge_formats: true,
            smart_paste: false,

            paste_preprocess: function (plugin, args) {
                const div = document.createElement("div");
                div.innerHTML = args.content;

                // 1. Strip all source formatting
                div.querySelectorAll("*").forEach(el => {
                    el.removeAttribute("style");
                    el.removeAttribute("class");
                    el.removeAttribute("face");
                    el.removeAttribute("size");
                    el.removeAttribute("color");
                    el.removeAttribute("bgcolor");
                    el.removeAttribute("align");
                    el.removeAttribute("valign");
                });

                div.querySelectorAll("span, font").forEach(el => {
                    el.replaceWith(...el.childNodes);
                });

                // 2. Remove empty paragraphs / divs
                div.querySelectorAll("p, div").forEach(el => {
                    const text = el.textContent
                        .replace(/\u00a0/g, "")
                        .trim();

                    if (!text && !el.querySelector("img, table, br")) {
                        el.remove();
                    }
                });

                // 3. Apply the formatting found at the cursor (inline, so the PDF matches too)
                let pasteStyle = "font-size: 14px; font-family: 'MADE Evolve Sans', Arial, sans-serif;";

                try {
                    const ed = that.editor;
                    if (ed) {
                        const node = ed.selection.getNode();
                        const cs = ed.getWin().getComputedStyle(node);
                        pasteStyle =
                            `font-size: ${cs.fontSize}; ` +
                            `font-family: ${cs.fontFamily.replace(/"/g, "'")};`;
                    }
                } catch (e) {
                    // fall back to the default style above
                }

                const blockSelector = "p, li, h1, h2, h3, h4, h5, h6";
                const blocks = Array.from(div.querySelectorAll(blockSelector))
                    // only wrap the innermost blocks to avoid double wrapping
                    .filter(el => !el.querySelector(blockSelector));

                if (blocks.length) {
                    blocks.forEach(el => {
                        el.innerHTML = `<span style="${pasteStyle}">${el.innerHTML}</span>`;
                    });
                } else if (div.innerHTML.trim()) {
                    // plain inline paste (no block elements)
                    div.innerHTML = `<span style="${pasteStyle}">${div.innerHTML}</span>`;
                }

                args.content = div.innerHTML;
            },
            // ---------- END PASTE HANDLING ----------

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