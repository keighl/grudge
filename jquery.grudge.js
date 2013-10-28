/*
 * Grudge - Modals... meh.

 * Copyright (c) 2012 Kyle Truscott
 *
 * http://keighl.github.com/grudge
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function ($) {

  // ----------------------------------

  "use strict";

  var methods = {

    init : function (options) {

      return $(this).each(function () {

        var $this    = $(this),
            settings = {
              speed : 250,
              classes : {
                backdrop : "grudge-backdrop",
                inner : 'grudge-inner',
                close : 'grudge-close'
              },
              callbacks : {
                content      : function () {},
                pre_launch : function () {},
                post_launch  : function () {},
                pre_dismiss : function () {},
                post_dismiss : function () {}
              },
              objects : {
                backdrop : null,
                inner  : null,
                close : null
              }
            };

        if (options) {
          $.extend(true, settings, options);
        }

        $this.bind("click.grudge", methods.launch);

        /*
        * Store all this stuff as data
        */

        $this.data('grudge', settings);

      });

    },

    // --------------------------------

    launch : function () {

      var $this = $(this),
       settings = $this.data("grudge");

      if (!settings) {
        return false;
      }

      settings.callbacks.pre_launch.call($this);

      settings.objects.backdrop = $('<div />', {
          'class' : settings.classes.backdrop
        })
        .appendTo("body")
        .bind("click.grudge", function (e) {
          if ($(e.target).attr("class") === settings.classes.backdrop) {
            methods.dismiss.call($this);
          }
        });

      settings.objects.inner = $('<div />', {
          'class' : settings.classes.inner
        })
        .append(settings.callbacks.content.call($this))
        .appendTo("body");

      settings.objects.close = $('<a />', {
        'class' : settings.classes.close,
        'href'  : '#'
      }).bind("click.grudge", function () {
        methods.dismiss.call($this);
        return false;
      }).appendTo(settings.objects.inner);

      $this.data("grudge", settings);

      settings.objects.backdrop.fadeIn(settings.speed, function () {

      });

      settings.objects.inner.fadeIn(settings.speed, function () {
        $(document).bind("keyup.grudge", function (e) {
          if (e.keyCode === 27) {
            methods.dismiss.call($this);
          }
        });

        settings.callbacks.post_launch.call($this);
      });

      return false;

    },

    // --------------------------------

    dismiss : function () {

      var $this = $(this),
       settings = $this.data("grudge");

      if (!settings) {
        return false;
      }

      if (!settings.objects.backdrop) {
        return false;
      }

      settings.callbacks.pre_dismiss.call($this);

      settings.objects.inner.fadeOut(settings.speed, function () {
        $(this).remove();
      });

      settings.objects.backdrop.fadeOut(settings.speed, function () {
        $(this).remove();
        settings.objects = {
          backdrop : null,
          inner  : null,
          close : null
        };
        $this.data("grudge", settings);
        settings.callbacks.post_dismiss.call($this);
      });

      return false;

    },

    // --------------------------------

    destroy : function () {

      return $(this).each(function () {

        var $this    = $(this),
            settings = $this.data("grudge");

        if (!settings) {
          return false;
        }

        // dismiss modal if its up

        $this.data('grudge', null);
        $this.unbind(".grudge");

      });

    }
  };

  // ----------------------------------

  $.fn.grudge = function (method) {

    if (methods[method]) {

      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);

    } else {

      $.error('Method ' +  method + ' does not exist on jQuery.grudge!');

    }

  };

}(jQuery));
