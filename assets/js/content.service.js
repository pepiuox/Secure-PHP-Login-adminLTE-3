function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default class ContentService {
  static isMjmlMode(editor) {
    if (!editor) {
      throw new Error('editor is required.');
    }

    return ContentService.getMode(editor) === ContentService.modeEmailMjml;
  }

  static getMode(editor) {
    const cfg = editor.getConfig();

    if (!cfg.pluginsOpts || !cfg.pluginsOpts.grapesjsmautic || !cfg.pluginsOpts.grapesjsmautic.mode) {
      throw new Error('Wrong Mautic Grapesjs mode');
    }

    return cfg.pluginsOpts.grapesjsmautic.mode;
  }
  /**
   * Get the current Canvas content as complete HTML document:
   * Combine original doctype, header, editor styles and content
   *
   * @param {GrapesJs Editor} editor
   * @returns HTMLDocument
   */


  static getCanvasAsHtmlDocument(editor) {
    const parser = new DOMParser(); // get original doctype, header and add it to the html

    const originalContent = ContentService.getOriginalContentHtml();
    const doctype = ContentService.serializeDoctype(originalContent.doctype);
    const htmlCombined = `${doctype}${editor.getHtml()}<style>${editor.getCss({
      avoidProtected: true
    })}</style>`;
    const htmlDocument = parser.parseFromString(htmlCombined, 'text/html'); // if no header is set on the canvas, replace it with existing from theme

    if (!htmlDocument.head.innerHTML && originalContent.head.innerHTML) {
      htmlDocument.head.innerHTML = originalContent.head.innerHTML;
    }

    return htmlDocument;
  }
  /**
   * Get complete current html. Including doctype and original header.
   * @returns string
   */


  static getEditorHtmlContent(editor) {
    if (!editor) {
      throw new Error('Editor is required.');
    }

    const contentDocument = ContentService.getCanvasAsHtmlDocument(editor);

    if (!contentDocument || !contentDocument.body) {
      throw new Error('No html content found');
    }

    return ContentService.serializeHtmlDocument(contentDocument);
  }
  /**
   * Serialize a HTML Document to a string
   * @param {DocumentHTML} contentDocument
   */


  static serializeHtmlDocument(contentDocument) {
    if (!contentDocument || !(contentDocument instanceof HTMLDocument)) {
      throw new Error('No Html Document');
    }

    return `${ContentService.serializeDoctype(contentDocument.doctype)}${contentDocument.head.outerHTML}${contentDocument.body.outerHTML}`;
  }
  /**
   * Returns the correct string for valid (HTML5) doctypes, eg:
   * <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">
   *
   * @param {DocumentType}
   * @returns string
   */


  static serializeDoctype(doctype) {
    if (!doctype) {
      return null;
    }

    return new XMLSerializer().serializeToString(doctype);
  }
  /**
   * Get the selected themes original or the users last saved
   * content from the db. Loaded via Mautic PHP into the textarea.
   * @returns HTMLDocument
   */


  static getOriginalContentHtml() {
    // Parse HTML theme/template
    const parser = new DOMParser();
    const textareaHtml = mQuery('textarea.builder-html');
    const doc = parser.parseFromString(textareaHtml.val(), 'text/html');

    if (!doc.body.innerHTML || !doc.head.innerHTML) {
      throw new Error('No valid HTML template found');
    }

    return doc;
  }
  /**
   * Extract all stylesheets from the template <head>
   * @todo use DocumentHTML Styles directly
   */


  static getStyles() {
    const content = ContentService.getOriginalContentHtml();

    if (!content.head) {
      return [];
    }

    const links = content.head.querySelectorAll('link');
    const styles = [];

    if (links) {
      links.forEach(link => {
        if (link && link.rel === 'stylesheet') {
          styles.push(link.href);
        }
      });
    }

    return styles;
  }

}

_defineProperty(ContentService, "modeEmailHtml", 'email-html');

_defineProperty(ContentService, "modeEmailMjml", 'email-mjml');

_defineProperty(ContentService, "modePageHtml", 'page-html');