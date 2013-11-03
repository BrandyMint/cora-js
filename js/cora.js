/**
 * Cora.js library.
 */
(function ($) {
  $.fn.cora = function(options) {
    var defaults = {
       frequency: 3000
    };

    var options = $.extend(defaults, options);

    var CoraElement = function(el) {
      $(el).attr('contenteditable', 'true');
      $(el).addClass('cora-editable');

      this.elem = el;
      this.key = $(el).data('cora-key');
      this.url = $(el).data('cora-url');
      this.timer = null;

      this.initTimer = function() {
        if (!this.timer) {
          this.timer = window.setTimeout($.proxy(function() {
            this.save()}, this), options.frequency
          );
        }
      }

      $(this.elem).keyup({el: this}, function(e) {
        e.data.el.initTimer();
      });

      this.save = function() {
        this.timer = null;
        this.send();
      }

      this.send = function() {
        $.ajax({
          url: this.url,
          type: $(el).data('cora-method') || 'put',
          data: {key: this.key, content: $(this.elem).html().trim()}
        }).success(function(){

        });
      }
    }

    $(this).each(function() {
      var obj = new CoraElement($(this));
    });



    return this;
  }

  $(document).ready(function(){
    $('[role="cora-content"]').cora();
  });

})(jQuery);
