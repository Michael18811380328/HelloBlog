# docxtemplater

# docxtemplater&#x20;

### version

3.49.1 •&#x20;

### downloads

95,272&#x20;

### repository

github.com/open-xml-templating/docxtemplater&#x20;

### homepage

github.com/open-xml-templating/docxtemplater#readme&#x20;

## default readme

​

# docxtemplater

> Note If you love docxtemplater, please help us spread your trust in
> docxtemplater by leaving us a video or text
> testimonial







docxtemplater is a library to generate docx/pptx documents from a
docx/pptx template. It can replace {placeholders} with data and also supports
loops and conditions. The templates can be edited by non-programmers, for
example your clients.

docxtemplater is very robust because of the many fixed issues over the
years, and the high quality of tests and code.

## Features

Demo Site

* Replace a {placeholder} by a value

* Use loops: {#users} {name} {/users}&#x20;

* Use loops in tables to generate columns

* Use conditions (if users.length>3) with angular Parsing

* Insert custom XML {@rawXml} (for formatted text for example)

## Quickstart

* Get started with docxtemplater on nodejs

* Get started with docxtemplater in the browser (react, angular, vue, nextjs)

## Documentation

The full documentation of the latest version can be found
here.

See CHANGELOG.md for information about how to
migrate from older versions.

## Modules

Functionality can be added with the following paid modules :

* Image module to add a given image with the syntax: {%image};

* Html Module to insert formatted text in a docx document with the syntax {\~html};

* XLSX Module to be able to do templating on Excel files (xlsx extension), also with loops and conditions;

* Chart Module to replace a chart by using data from the JSON object that you give with the syntax {\$chart};

* Html-Pptx Module to insert formatted text in a pptx document with the syntax {\~html};

* Error Location Module to show the errors in the template using Word comments

* Slides Module to create multiple slides dynamically with the syntax {:users};

* Subtemplate Module to include an external docx file inside a given docx file with the syntax {:include doc};

* Subsection Module to include subsections (headers/footers) from an other document with the syntax {:subsection doc};

* Subtemplate-pptx Module to include an external pptx file inside a given pptx file with the syntax {:include doc};

* Word-Run Module to include raw runs (w:r) inside the document with the syntax {r\@wrun}. This makes it possible to include styled text without having to remove the enclosing paragraph like in the {@rawXml} tag;

* QrCode Module to replace an image, keeping any existing properties;

* Table Module to create tables from two dimensional data using the syntax {:table data};

* Meta Module to make a document readonly, add a text watermark or update the margins;

* Styling Module restyle a paragraph, a cell or a table depending on some data using the syntax {:stylepar style};

* Footnotes Module to be able to add footnotes to a document using the syntax {:footnotes foot}

* Paragraph Placeholder Module to simplify conditions that should show or hide a given paragraph using the syntax {?tag}

## About docxtemplater

Docxtemplater is my main job, and has been maintained for over 8 years. Expect
to get great support if you buy any modules, and also good support on the
open-source version.

&#x20;          &#x20;


