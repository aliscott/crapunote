(function($) {
  var storyRowSelector = 'tr.level_1';
  var taskRowSelector = 'tr.level_2';
  var expandedStories = [];

  function addExpandAnchor(tr) {
    var descriptionDiv = $(tr).find('.description');
    descriptionDiv.parent().prepend(
      $('<a></a>')
        .attr('href', '#')
        .html('<div class="slider_icon sprite-down_arrow"></div>')
        .click(function(e) {
          toggleRow(tr);
          e.preventDefault();
        })
    );
  }

  function addExpandAllAnchors() {
    $('#task_table thead .title').append(
      $('<a></a>')
        .addClass('expand_all')
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
        .addClass('collapse_all')
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
    return !$(tr).hasClass('collapsed')
  }

  function expandRow(tr) {
    $(tr).nextUntil(storyRowSelector, taskRowSelector).show();
    $(tr).find('.slider_icon').removeClass('sprite-right_arrow').addClass('sprite-down_arrow');
    $(tr).removeClass('collapsed');
    expandedStories.push(tr.id);
  }

  function collapseRow(tr) {
    $(tr).nextUntil(storyRowSelector, taskRowSelector).hide();
    $(tr).find('.slider_icon').removeClass('sprite-down_arrow').addClass('sprite-right_arrow');
    $(tr).addClass('collapsed');
    var rowIndex = $.inArray(tr.id, expandedStories);
    if (rowIndex !== -1) {
      expandedStories.splice(rowIndex, 1);
    }
  }

  function toggleRow(tr) {
    if (isRowExpanded(tr)) {
      collapseRow(tr);
    } else {
      expandRow(tr);
    }
  }

  function setupExpandAnchors() {
    addExpandAllAnchors();
    $(storyRowSelector).each(function(i, tr) {
      if ($(tr).nextUntil(storyRowSelector, taskRowSelector).length > 0) {
        addExpandAnchor(tr);
      }
      if ($.inArray(tr.id, expandedStories) === -1) {
        collapseRow(tr);
      }
    });
  }

  function isExpandAnchorsSetup() {
    return $('.expand_all').length >= 1;
  }

  $(document).ready(function() {
    setupExpandAnchors();
    $('#main').on('DOMSubtreeModified', '#task_table', function() {
      if (!isExpandAnchorsSetup()) {
        setupExpandAnchors();
      }
    });
  });
})(jQuery);
