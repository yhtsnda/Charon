$(function () {
    $('.js-btn-add').on('click', function () {
        var datas = $('#data').serializeArray();

        $.ajax({
            type: 'POST',
            url: '/rule',
            data : {
                method: _.find(datas, function (data) {
                    return data.name === 'from-method'
                }).value,
                distMethod: _.find(datas, function (data) {
                    return data.name === 'to-method'
                }).value,
                dist: _.find(datas, function (data) {
                    return data.name === 'to-url'
                }).value
            }
        })
    });
});
