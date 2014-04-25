(function($) {
  var storyRowSelector = 'tr.level_1';
  var taskRowSelector = 'tr.level_2';

  function addExpandAnchor(tr) {
    var descriptionDiv = $(tr).find('.description');
    descriptionDiv.parent().prepend(
      $('<a></a>')
        .attr('href', '#')
        .html('<div class="slider_icon sprite-right_arrow"></div>')
        .click(function(e) {
          toggleRow(tr);
          e.preventDefault();
        })
    );
  }

  function addExpandAllAnchors() {
    $('#task_table thead .title').append(
      $('<a></a>')
        .attr('href', '#')
        .text('expand all')
        .click(function(e) {
          expandAll();
          e.preventDefault();
        })
    )
    .append('<span> / </span>')
    .append(
      $('<a></a>')
        .attr('href', '#')
        .text('collapse all')
        .click(function(e) {
          collapseAll();
          e.preventDefault();
        })
    );
  }

  function expandAll() {
    $(storyRowSelector).each(function(i, tr) { expandRow(tr); });
  }

  function collapseAll() {
    $(storyRowSelector).each(function(i, tr) { collapseRow(tr); });
  }

  function isRowExpanded(tr) {
    return $(tr).hasClass('expanded')
  }

  function expandRow(tr) {
    $(tr).nextUntil(storyRowSelector, taskRowSelector).show();
    $(tr).find('.slider_icon').removeClass('sprite-right_arrow').addClass('sprite-down_arrow');
    $(tr).addClass('expanded');
  }

  function collapseRow(tr) {
    $(tr).nextUntil(storyRowSelector, taskRowSelector).hide();
    $(tr).find('.slider_icon').removeClass('sprite-down_arrow').addClass('sprite-right_arrow');
    $(tr).removeClass('expanded');
  }

  function toggleRow(tr) {
    if (isRowExpanded(tr)) {
      collapseRow(tr);
    } else {
      expandRow(tr);
    }
  }

  $(document).ready(function() {
    collapseAll();
    addExpandAllAnchors();
    $(storyRowSelector).each(function(i, tr) {
      addExpandAnchor(tr);
    });
  });
})(jQuery);
