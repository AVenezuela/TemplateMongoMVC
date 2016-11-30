function lazyLoad($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'lzyDataTable',
            files: [
                    'https://cdn.datatables.net/v/bs/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/af-2.1.2/b-1.2.2/b-html5-1.2.2/b-print-1.2.2/fh-3.1.2/r-2.1.0/sc-1.4.2/datatables.min.css'
                    , 'https://cdn.datatables.net/v/bs/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/af-2.1.2/b-1.2.2/b-html5-1.2.2/b-print-1.2.2/fh-3.1.2/r-2.1.0/sc-1.4.2/datatables.min.js'
            ]
        }]
    });
}