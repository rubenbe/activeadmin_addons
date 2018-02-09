$(function() {
  $('.interactive-tag').click(function(e) {
    var tag = $(e.target);
    var model = tag.data('model');
    var objectId = tag.data('object_id');
    var field = tag.data('field');
    var selectTag = $('.' + model + '-' + field + '-' + objectId + '-select');
    selectTag.removeClass('select-container-hidden');
    tag.addClass('interactive-tag-hidden');
    selectTag.find('select').select2('open');
  });

  $('.interactive-tag-select').on('select2:close', function(e) {
    var selectTag = $(e.target).parent();

    var model = selectTag.data('model');
    var objectId = selectTag.data('object_id');
    var field = selectTag.data('field');

    var tag = $('.' + model + '-' + field + '-' + objectId + '-tag');

    var newValue = e.target.value;
    var oldValue = selectTag.data('value');

    if (newValue === oldValue) {
      selectTag.addClass('select-container-hidden');
      tag.removeClass('interactive-tag-hidden');
    } else {
      var url = tag.data('url');
      var data = { id: objectId };
      data[model] = {};
      data[model][field] = newValue;

      $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        error: function() {
          var errorMsg = 'Error: Update Unsuccessful';
          console.log(errorMsg);
        },
        success: function() {
          tag.text(newValue);
          tag.removeClass(oldValue);
          tag.addClass(newValue);

          tag.data('value', newValue);
          selectTag.data('value', newValue);
        },
        complete: function() {
          selectTag.addClass('select-container-hidden');
          tag.removeClass('interactive-tag-hidden');
        },
        type: 'PATCH',
      });
    }
  });
});
